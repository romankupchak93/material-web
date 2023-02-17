/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a;
import { __decorate, __metadata } from "tslib";
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { html, LitElement, nothing } from 'lit';
import { property, query, queryAsync, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { dispatchActivationClick, isActivationClick, redispatchEvent } from '../../controller/events.js';
import { FormController, getFormValue } from '../../controller/form-controller.js';
import { ariaProperty } from '../../decorators/aria-property.js';
import { pointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { ripple } from '../../ripple/directive.js';
import { SingleSelectionController } from './single-selection-controller.js';
const CHECKED = Symbol('checked');
/**
 * A radio component.
 */
export class Radio extends LitElement {
    constructor() {
        super();
        this[_a] = false;
        /**
         * Whether or not the radio is disabled.
         */
        this.disabled = false;
        /**
         * The element value to use in form submission when checked.
         */
        this.value = 'on';
        /**
         * The HTML name to use in form submission.
         */
        this.name = '';
        this.selectionController = new SingleSelectionController(this);
        this.showFocusRing = false;
        this.showRipple = false;
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderRipple = () => {
            return html `<md-ripple unbounded ?disabled=${this.disabled}></md-ripple>`;
        };
        this.addController(new FormController(this));
        this.addController(this.selectionController);
        this.addEventListener('click', (event) => {
            if (!isActivationClick(event)) {
                return;
            }
            this.focus();
            dispatchActivationClick(this.input);
        });
    }
    /**
     * Whether or not the radio is selected.
     */
    get checked() {
        return this[CHECKED];
    }
    set checked(checked) {
        const wasChecked = this.checked;
        if (wasChecked === checked) {
            return;
        }
        this[CHECKED] = checked;
        this.requestUpdate('checked', wasChecked);
        this.selectionController.handleCheckedChange();
    }
    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
        return this.closest('form');
    }
    [(_a = CHECKED, getFormValue)]() {
        return this.checked ? this.value : null;
    }
    focus() {
        this.input?.focus();
    }
    render() {
        return html `
      ${when(this.showRipple, this.renderRipple)}
      ${this.renderFocusRing()}
      <svg class="icon" viewBox="0 0 20 20">
        <mask id="cutout">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="10" cy="10" r="8" fill="black" />
        </mask>
        <circle class="outer circle" cx="10" cy="10" r="10" mask="url(#cutout)" />
        <circle class="inner circle" cx="10" cy="10" r="5" />
      </svg>
      <input
        type="radio"
        name=${this.name}
        aria-label=${this.ariaLabel || nothing}
        .checked=${this.checked}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
    `;
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleChange(event) {
        if (this.disabled) {
            return;
        }
        // Per spec, the change event on a radio input always represents checked.
        this.checked = true;
        redispatchEvent(this, event);
    }
    handlePointerDown() {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    renderFocusRing() {
        return html `<md-focus-ring .visible=${this.showFocusRing}></md-focus-ring>`;
    }
}
Radio.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
/**
 * @nocollapse
 */
Radio.formAssociated = true;
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Radio.prototype, "checked", null);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Radio.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Radio.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], Radio.prototype, "name", void 0);
__decorate([
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    property({ attribute: 'data-aria-label', noAccessor: true }),
    __metadata("design:type", String)
], Radio.prototype, "ariaLabel", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], Radio.prototype, "input", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], Radio.prototype, "ripple", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Radio.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Radio.prototype, "showRipple", void 0);
//# sourceMappingURL=radio.js.map