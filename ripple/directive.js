/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { noChange } from 'lit';
import { Directive, directive, PartType } from 'lit/directive.js';
/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS = 150;
/**
 * Interaction states for the ripple.
 *
 * On Touch:
 *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
 *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
 *
 * On Mouse or Pen:
 *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
 */
var State;
(function (State) {
    /**
     * Initial state of the control, no touch in progress.
     *
     * Transitions:
     *   - on touch down: transition to `TOUCH_DELAY`.
     *   - on mouse down: transition to `WAITING_FOR_CLICK`.
     */
    State[State["INACTIVE"] = 0] = "INACTIVE";
    /**
     * Touch down has been received, waiting to determine if it's a swipe or
     * scroll.
     *
     * Transitions:
     *   - on touch up: beginPress(); transition to `WAITING_FOR_CLICK`.
     *   - on cancel: transition to `INACTIVE`.
     *   - after `TOUCH_DELAY_MS`: beginPress(); transition to `HOLDING`.
     */
    State[State["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    /**
     * A touch has been deemed to be a press
     *
     * Transitions:
     *  - on up: transition to `WAITING_FOR_CLICK`.
     */
    State[State["HOLDING"] = 2] = "HOLDING";
    /**
     * The user touch has finished, transition into rest state.
     *
     * Transitions:
     *   - on click endPress(); transition to `INACTIVE`.
     */
    State[State["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
class RippleDirective extends Directive {
    constructor(partInfo) {
        super(partInfo);
        this.rippleGetter = async () => null;
        this.state = State.INACTIVE;
        this.checkBoundsAfterContextMenu = false;
        this.rippleStartEvent = null;
        this.touchTimer = null;
        this.clickTimer = null;
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('The `ripple` directive must be used on an element');
        }
    }
    render(ripple) {
        return noChange;
    }
    // Use EventListenerObject::handleEvent interface to handle events without
    // generating bound event handlers
    async handleEvent(event) {
        const ripple = await this.rippleGetter();
        if (!ripple) {
            return;
        }
        switch (event.type) {
            case 'click':
                this.click(ripple);
                break;
            case 'contextmenu':
                this.contextMenu(ripple);
                break;
            case 'pointercancel':
                this.pointerCancel(ripple, event);
                break;
            case 'pointerdown':
                this.pointerDown(ripple, event);
                break;
            case 'pointerenter':
                this.pointerEnter(ripple, event);
                break;
            case 'pointerleave':
                this.pointerLeave(ripple, event);
                break;
            case 'pointerup':
                this.pointerUp(ripple, event);
                break;
            default:
                break;
        }
    }
    update(part, [ripple]) {
        if (!this.element) {
            // NOTE: addEventListener typing needs to be used with HTMLElements or a
            // subclass
            this.element = part.element;
            this.element.addEventListener('click', this);
            this.element.addEventListener('contextmenu', this);
            this.element.addEventListener('pointercancel', this);
            this.element.addEventListener('pointerdown', this);
            this.element.addEventListener('pointerenter', this);
            this.element.addEventListener('pointerleave', this);
            this.element.addEventListener('pointerup', this);
        }
        // Normalize given ripple accessor
        this.rippleGetter = typeof ripple === 'function' ? ripple : () => ripple;
        return noChange;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(ripple, ev, hovering = false) {
        const enabled = !ripple.disabled;
        const isPrimaryPointer = ev.isPrimary;
        const isInteractionPointer = this.rippleStartEvent === null ||
            this.rippleStartEvent.pointerId === ev.pointerId;
        const isPrimaryButton = ev.buttons === 1;
        return enabled && isPrimaryPointer && isInteractionPointer &&
            (this.isTouch(ev) || isPrimaryButton || hovering);
    }
    isTouch({ pointerType }) {
        return pointerType === 'touch';
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x, y }) {
        const { top, left, bottom, right } = this.element.getBoundingClientRect();
        return x >= left && x <= right && y >= top && y <= bottom;
    }
    beginPress(ripple) {
        ripple.beginPress(this.rippleStartEvent);
    }
    endPress(ripple) {
        ripple.endPress();
        this.state = State.INACTIVE;
        this.rippleStartEvent = null;
        if (this.touchTimer) {
            clearTimeout(this.touchTimer);
            this.touchTimer = null;
        }
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
        }
    }
    waitForTouchHold() {
        if (this.touchTimer !== null) {
            clearTimeout(this.touchTimer);
        }
        this.state = State.TOUCH_DELAY;
        this.touchTimer = setTimeout(async () => {
            const ripple = await this.rippleGetter();
            if (ripple === null || this.state !== State.TOUCH_DELAY) {
                return;
            }
            this.state = State.HOLDING;
            this.beginPress(ripple);
        }, TOUCH_DELAY_MS);
    }
    click(ripple) {
        // Click is a MouseEvent in Firefox and Safari, so we cannot use
        // `shouldReactToEvent`
        if (ripple.disabled) {
            return;
        }
        if (this.state === State.WAITING_FOR_CLICK) {
            this.endPress(ripple);
        }
        else if (this.state === State.INACTIVE) {
            // keyboard synthesized click event
            this.beginPress(ripple);
            this.endPress(ripple);
        }
    }
    contextMenu(ripple) {
        if (!ripple.disabled) {
            this.checkBoundsAfterContextMenu = true;
            this.endPress(ripple);
        }
    }
    pointerDown(ripple, ev) {
        if (!this.shouldReactToEvent(ripple, ev)) {
            return;
        }
        this.rippleStartEvent = ev;
        if (this.isTouch(ev)) {
            // after a longpress contextmenu event, an extra `pointerdown` can be
            // dispatched to the pressed element. Check that the down is within
            // bounds of the element in this case.
            if (this.checkBoundsAfterContextMenu && !this.inBounds(ev)) {
                return;
            }
            this.checkBoundsAfterContextMenu = false;
            this.waitForTouchHold();
        }
        else {
            this.state = State.WAITING_FOR_CLICK;
            this.beginPress(ripple);
        }
    }
    pointerUp(ripple, ev) {
        if (!this.isTouch(ev) || !this.shouldReactToEvent(ripple, ev)) {
            return;
        }
        if (this.state === State.HOLDING) {
            this.state = State.WAITING_FOR_CLICK;
        }
        else if (this.state === State.TOUCH_DELAY) {
            this.state = State.WAITING_FOR_CLICK;
            this.beginPress(ripple);
        }
    }
    pointerCancel(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev)) {
            this.endPress(ripple);
        }
    }
    pointerEnter(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev, true)) {
            ripple.beginHover(ev);
        }
    }
    pointerLeave(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev, true)) {
            ripple.endHover();
            // release a held mouse or pen press that moves outside the element
            if (!this.isTouch(ev) && this.state !== State.INACTIVE) {
                this.endPress(ripple);
            }
        }
    }
}
/**
 * Connects a Ripple element to a node that drives the interaction
 *
 * @param rippleGetter A function that returns an `md-ripple` element
 * @param simulateKeyboardClick For elements that do not issue a click on
 *     keyboard interaction, pass `true` to enable press animations on Enter or
 *     Spacebar
 */
export const ripple = directive(RippleDirective);
//# sourceMappingURL=directive.js.map