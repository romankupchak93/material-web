/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// This is required for @ariaProperty
// tslint:disable:no-new-decorators
import '../../focus/focus-ring.js';
import '../../icon/icon.js';
import '../../ripple/ripple.js';
import { html, LitElement } from 'lit';
import { property, query, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { isRtl } from '../../controller/is-rtl.js';
import { ariaProperty } from '../../decorators/aria-property.js';
import { pointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { ripple } from '../../ripple/directive.js';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class IconButton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Disables the icon button and makes it non-interactive.
         */
        this.disabled = false;
        /**
         * Flips the icon if it is in an RTL context at startup.
         */
        this.flipIconInRtl = false;
        this.flipIcon = isRtl(this, this.flipIconInRtl);
        this.showFocusRing = false;
        this.showRipple = false;
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderRipple = () => {
            return html `<md-ripple ?disabled="${this.disabled}"></md-ripple>`;
        };
    }
    render() {
        return html `<button
        class="md3-icon-button ${classMap(this.getRenderClasses())}"
        aria-label="${ifDefined(this.ariaLabel)}"
        aria-haspopup="${ifDefined(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        ${ripple(this.getRipple)}>
        ${this.renderFocusRing()}
        ${when(this.showRipple, this.renderRipple)}
        ${this.renderIcon()}
        ${this.renderTouchTarget()}
  </button>`;
    }
    getRenderClasses() {
        return {
            'md3-icon-button--flip-icon': this.flipIcon,
        };
    }
    renderIcon() {
        // Note, it's important not to render the icon property as a slot fallback
        // to avoid any whitespace from overridding it.
        return html `<md-icon class="md3-icon-button__icon"><slot></slot></md-icon>`;
    }
    renderTouchTarget() {
        return html `<span class="md3-icon-button__touch"></span>`;
    }
    renderFocusRing() {
        return html `<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    connectedCallback() {
        this.flipIcon = isRtl(this, this.flipIconInRtl);
        super.connectedCallback();
    }
    handlePointerDown() {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], IconButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], IconButton.prototype, "flipIconInRtl", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], IconButton.prototype, "flipIcon", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-label' }),
    __metadata("design:type", String)
], IconButton.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-haspopup' }),
    __metadata("design:type", String)
], IconButton.prototype, "ariaHasPopup", void 0);
__decorate([
    query('button'),
    __metadata("design:type", HTMLElement)
], IconButton.prototype, "buttonElement", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], IconButton.prototype, "ripple", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], IconButton.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], IconButton.prototype, "showRipple", void 0);
//# sourceMappingURL=icon-button.js.map