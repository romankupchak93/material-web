/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// tslint:disable:no-new-decorators
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { html, LitElement } from 'lit';
import { eventOptions, property, query, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { dispatchActivationClick, isActivationClick } from '../../controller/events.js';
import { FormController, getFormValue } from '../../controller/form-controller.js';
import { ariaProperty } from '../../decorators/aria-property.js';
import { pointerPress as focusRingPointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { ripple } from '../../ripple/directive.js';
/**
 * @fires input {InputEvent} Fired whenever `selected` changes due to user
 * interaction (bubbles and composed).
 * @fires change {Event} Fired whenever `selected` changes due to user
 * interaction (bubbles).
 */
export class Switch extends LitElement {
    constructor() {
        super();
        /**
         * Disables the switch and makes it non-interactive.
         */
        this.disabled = false;
        /**
         * Puts the switch in the selected state and sets the form submission value to
         * the `value` property.
         */
        this.selected = false;
        /**
         * Shows both the selected and deselected icons.
         */
        this.icons = false;
        /**
         * Shows only the selected icon, and not the deselected icon. If `true`,
         * overrides the behavior of the `icons` property.
         */
        this.showOnlySelectedIcon = false;
        this.ariaLabelledBy = '';
        this.showFocusRing = false;
        this.showRipple = false;
        /**
         * The HTML name to use in form submission.
         */
        this.name = '';
        /**
         * The value associated with this switch on form submission. `null` is
         * submitted when `selected` is `false`.
         */
        this.value = 'on';
        this.renderRipple = () => {
            return html `
      <span class="md3-switch__ripple">
        <md-ripple
          ?disabled="${this.disabled}"
          unbounded>
        </md-ripple>
      </span>
    `;
        };
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderFocusRing = () => {
            return html `<md-focus-ring visible></md-focus-ring>`;
        };
        this.addController(new FormController(this));
        this.addEventListener('click', (event) => {
            if (!isActivationClick(event)) {
                return;
            }
            this.button?.focus();
            if (this.button != null) {
                // this triggers the click behavior, and the ripple
                dispatchActivationClick(this.button);
            }
        });
    }
    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
        return this.closest('form');
    }
    [getFormValue]() {
        return this.selected ? this.value : null;
    }
    render() {
        const ariaLabelValue = this.ariaLabel ? this.ariaLabel : undefined;
        const ariaLabelledByValue = this.ariaLabelledBy ? this.ariaLabelledBy : undefined;
        // NOTE: buttons must use only [phrasing
        // content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content)
        // children, which includes custom elements, but not `div`s
        return html `
      <button
        type="button"
        class="md3-switch ${classMap(this.getRenderClasses())}"
        role="switch"
        aria-checked="${this.selected}"
        aria-label="${ifDefined(ariaLabelValue)}"
        aria-labelledby="${ifDefined(ariaLabelledByValue)}"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
        ${when(this.showFocusRing, this.renderFocusRing)}
        <span class="md3-switch__track">
          ${this.renderHandle()}
        </span>
      </button>
    `;
    }
    getRenderClasses() {
        return {
            'md3-switch--selected': this.selected,
            'md3-switch--unselected': !this.selected,
        };
    }
    renderHandle() {
        /** @classMap */
        const classes = {
            'md3-switch__handle--big': this.icons && !this.showOnlySelectedIcon,
        };
        return html `
      <span class="md3-switch__handle-container">
        ${when(this.showRipple, this.renderRipple)}
        <span class="md3-switch__handle ${classMap(classes)}">
          ${this.shouldShowIcons() ? this.renderIcons() : html ``}
        </span>
        ${this.renderTouchTarget()}
      </span>
    `;
    }
    renderIcons() {
        return html `
      <div class="md3-switch__icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? html `` : this.renderOffIcon()}
      </div>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOnIcon() {
        return html `
      <svg class="md3-switch__icon md3-switch__icon--on" viewBox="0 0 24 24">
        <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"/>
      </svg>
    `;
    }
    /**
     * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
     */
    renderOffIcon() {
        return html `
      <svg class="md3-switch__icon md3-switch__icon--off" viewBox="0 0 24 24">
        <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"/>
      </svg>
    `;
    }
    renderTouchTarget() {
        return html `<span class="md3-switch__touch"></span>`;
    }
    shouldShowIcons() {
        return this.icons || this.showOnlySelectedIcon;
    }
    handleClick() {
        if (this.disabled) {
            return;
        }
        this.selected = !this.selected;
        this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        // Bubbles but does not compose to mimic native browser <input> & <select>
        // Additionally, native change event is not an InputEvent.
        this.dispatchEvent(new Event('change', { bubbles: true }));
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    handlePointerDown() {
        focusRingPointerPress();
        this.showFocusRing = false;
    }
}
Switch.shadowRootOptions = { mode: 'open', delegatesFocus: true };
/**
 * @nocollapse
 */
Switch.formAssociated = true;
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Switch.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Switch.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Switch.prototype, "icons", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Switch.prototype, "showOnlySelectedIcon", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    __metadata("design:type", String)
], Switch.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-labelledby', noAccessor: true }),
    __metadata("design:type", Object)
], Switch.prototype, "ariaLabelledBy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Switch.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Switch.prototype, "showRipple", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], Switch.prototype, "ripple", void 0);
__decorate([
    query('button'),
    __metadata("design:type", HTMLButtonElement)
], Switch.prototype, "button", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], Switch.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Switch.prototype, "value", void 0);
__decorate([
    eventOptions({ passive: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Switch.prototype, "handlePointerDown", null);
//# sourceMappingURL=switch.js.map