/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../../focus/focus-ring.js';
import '../../../ripple/ripple.js';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ActionElement } from '../../../actionelement/action-element.js';
import { ariaProperty } from '../../../decorators/aria-property.js';
import { pointerPress, shouldShowStrongFocus } from '../../../focus/strong-focus.js';
import { MdRipple } from '../../../ripple/ripple.js';
import { Md3ChipActionEventType } from './events.js';
/**
 * Base class for all actions.
 * @soyCompatible
 */
export class Action extends ActionElement {
    constructor() {
        super(...arguments);
        this.isDeletable = false;
        this.isFocusable = false;
        this.isTouchable = false;
        this.disabled = false;
        this.showFocusRing = false;
    }
    /** @soyTemplate */
    getRootClasses() {
        return {
            'md3-chip__action': true,
        };
    }
    /** @soyTemplate */
    getRippleClasses() {
        return {
            'md3-chip__ripple': true,
        };
    }
    /** @soyTemplate */
    renderTouchTarget() {
        return this.isTouchable ?
            html `<span class="md3-chip__action-touch"></span>` :
            html ``;
    }
    /** @soyTemplate */
    renderRipple() {
        return html `
      <md-ripple class="${classMap(this.getRippleClasses())}"
          ?disabled="${this.disabled}">
      </md-ripple>`;
    }
    /** @soyTemplate */
    renderFocusRing() {
        return html `
      <md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    beginPress({ positionEvent }) {
        this.ripple?.beginPress(positionEvent);
    }
    endPress(options) {
        super.endPress(options);
        this.ripple?.endPress();
        if (!options.cancelled) {
            this.dispatchCustomEvent(this.getInteractionEvent());
        }
    }
    handlePointerEnter(e) {
        this.ripple?.beginHover(e);
    }
    handlePointerLeave(e) {
        super.handlePointerLeave(e);
        this.ripple?.endHover();
    }
    handlePointerDown(e) {
        super.handlePointerDown(e);
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleClick(e) {
        super.handleClick(e);
        this.dispatchCustomEvent(this.getInteractionEvent());
    }
    handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
            case ' ':
                this.dispatchCustomEvent(this.getInteractionEvent());
                break;
            case 'Delete':
            case 'Backspace':
                if (this.isDeletable) {
                    this.dispatchCustomEvent(Md3ChipActionEventType.DELETE);
                }
                break;
            case 'ArrowLeft':
                this.dispatchCustomEvent(this.isRTL() ? Md3ChipActionEventType.NAVIGATE_TO_NEXT :
                    Md3ChipActionEventType.NAVIGATE_TO_PREV);
                break;
            case 'ArrowRight':
                this.dispatchCustomEvent(this.isRTL() ? Md3ChipActionEventType.NAVIGATE_TO_PREV :
                    Md3ChipActionEventType.NAVIGATE_TO_NEXT);
                break;
            case 'Home':
                this.dispatchCustomEvent(Md3ChipActionEventType.NAVIGATE_TO_FIRST);
                break;
            case 'End':
                this.dispatchCustomEvent(Md3ChipActionEventType.NAVIGATE_TO_LAST);
                break;
            default:
            // Unhandled key, do nothing.
        }
    }
    getInteractionEvent() {
        return Md3ChipActionEventType.SELECT;
    }
    dispatchCustomEvent(eventType) {
        this.dispatchEvent(new CustomEvent(eventType, { bubbles: true, composed: true }));
    }
    isRTL() {
        return getComputedStyle(this).getPropertyValue('direction') === 'rtl';
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Action.prototype, "isDeletable", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Action.prototype, "isFocusable", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Action.prototype, "isTouchable", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Action.prototype, "disabled", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Action.prototype, "showFocusRing", void 0);
__decorate([
    query('md-ripple'),
    __metadata("design:type", MdRipple)
], Action.prototype, "ripple", void 0);
__decorate([
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    property({ type: String, attribute: 'aria-label' }),
    __metadata("design:type", String)
], Action.prototype, "ariaLabel", void 0);
//# sourceMappingURL=action.js.map