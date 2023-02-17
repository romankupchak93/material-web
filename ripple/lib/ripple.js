/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EASING } from '../../motion/animation.js';
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = '::after';
const ANIMATION_FILL = 'forwards';
/**
 * A ripple component.
 */
export class Ripple extends LitElement {
    constructor() {
        super(...arguments);
        // TODO(https://bugs.webkit.org/show_bug.cgi?id=247546)
        // Remove Safari workaround that requires reflecting `unbounded` so
        // it can be styled against.
        /**
         * Sets the ripple to be an unbounded circle.
         */
        this.unbounded = false;
        /**
         * Disables the ripple.
         */
        this.disabled = false;
        this.hovered = false;
        this.focused = false;
        this.pressed = false;
        this.rippleSize = '';
        this.rippleScale = '';
        this.initialSize = 0;
    }
    beginHover(hoverEvent) {
        if (hoverEvent?.pointerType !== 'touch') {
            this.hovered = true;
        }
    }
    endHover() {
        this.hovered = false;
    }
    beginFocus() {
        this.focused = true;
    }
    endFocus() {
        this.focused = false;
    }
    beginPress(positionEvent) {
        this.pressed = true;
        clearTimeout(this.delayedEndPressHandle);
        this.startPressAnimation(positionEvent);
    }
    endPress() {
        const pressAnimationPlayState = this.growAnimation?.currentTime ?? Infinity;
        if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
            this.pressed = false;
        }
        else {
            this.delayedEndPressHandle = setTimeout(() => {
                this.pressed = false;
            }, MINIMUM_PRESS_MS - pressAnimationPlayState);
        }
    }
    render() {
        const classes = {
            'hovered': this.hovered,
            'focused': this.focused,
            'pressed': this.pressed,
            'unbounded': this.unbounded,
        };
        return html `<div class="surface ${classMap(classes)}"></div>`;
    }
    update(changedProps) {
        if (changedProps.has('disabled') && this.disabled) {
            this.endHover();
            this.endFocus();
            this.endPress();
        }
        super.update(changedProps);
    }
    getDimensions() {
        return (this.parentElement ?? this).getBoundingClientRect();
    }
    determineRippleSize() {
        const { height, width } = this.getDimensions();
        const maxDim = Math.max(height, width);
        const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
        let maxRadius = maxDim;
        let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
        const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
        maxRadius = hypotenuse + PADDING;
        // ensure `initialSize` is even for unbounded
        if (this.unbounded) {
            initialSize = initialSize - (initialSize % 2);
        }
        this.initialSize = initialSize;
        this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
        this.rippleSize = `${this.initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
        const { scrollX, scrollY } = window;
        const { left, top } = this.getDimensions();
        const documentX = scrollX + left;
        const documentY = scrollY + top;
        const { pageX, pageY } = pointerEvent;
        return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
        const { height, width } = this.getDimensions();
        // end in the center
        const endPoint = {
            x: (width - this.initialSize) / 2,
            y: (height - this.initialSize) / 2,
        };
        let startPoint;
        if (positionEvent instanceof PointerEvent) {
            startPoint = this.getNormalizedPointerEventCoords(positionEvent);
        }
        else {
            startPoint = {
                x: width / 2,
                y: height / 2,
            };
        }
        // center around start point
        startPoint = {
            x: startPoint.x - (this.initialSize / 2),
            y: startPoint.y - (this.initialSize / 2),
        };
        return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
        this.growAnimation?.cancel();
        this.determineRippleSize();
        const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
        const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
        const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
        this.growAnimation = this.mdRoot.animate({
            top: [0, 0],
            left: [0, 0],
            height: [this.rippleSize, this.rippleSize],
            width: [this.rippleSize, this.rippleSize],
            transform: [
                `translate(${translateStart}) scale(1)`,
                `translate(${translateEnd}) scale(${this.rippleScale})`
            ],
        }, {
            pseudoElement: PRESS_PSEUDO,
            duration: PRESS_GROW_MS,
            easing: EASING.STANDARD,
            fill: ANIMATION_FILL
        });
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Ripple.prototype, "unbounded", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Ripple.prototype, "disabled", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Ripple.prototype, "hovered", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Ripple.prototype, "focused", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Ripple.prototype, "pressed", void 0);
__decorate([
    query('.surface'),
    __metadata("design:type", HTMLElement)
], Ripple.prototype, "mdRoot", void 0);
//# sourceMappingURL=ripple.js.map