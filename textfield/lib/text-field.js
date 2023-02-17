/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html, LitElement } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html as staticHtml } from 'lit/static-html.js';
import { redispatchEvent } from '../../controller/events.js';
import { FormController, getFormValue } from '../../controller/form-controller.js';
import { stringConverter } from '../../controller/string-converter.js';
import { ariaProperty } from '../../decorators/aria-property.js';
/** @soyCompatible */
export class TextField extends LitElement {
    constructor() {
        super();
        this.disabled = false;
        /**
         * Gets or sets whether or not the text field is in a visually invalid state.
         *
         * Calling `reportValidity()` will automatically update `error`.
         */
        this.error = false;
        /**
         * The error message that replaces supporting text when `error` is true. If
         * `errorText` is an empty string, then the supporting text will continue to
         * show.
         *
         * Calling `reportValidity()` will automatically update `errorText` to the
         * native `validationMessage`.
         */
        this.errorText = '';
        this.required = false;
        /**
         * The current value of the text field. It is always a string.
         *
         * This is equal to `defaultValue` before user input.
         */
        this.value = '';
        /**
         * The default value of the text field. Before user input, changing the
         * default value will update `value` as well.
         *
         * When the text field is reset, its `value` will be set to this default
         * value.
         */
        this.defaultValue = '';
        /**
         * An optional prefix to display before the input value.
         */
        this.prefixText = '';
        /**
         * An optional suffix to display after the input value.
         */
        this.suffixText = '';
        /**
         * Whether or not the text field has a leading icon. Used for SSR.
         */
        this.hasLeadingIcon = false;
        /**
         * Whether or not the text field has a trailing icon. Used for SSR.
         */
        this.hasTrailingIcon = false;
        /**
         * Conveys additional information below the text field, such as how it should
         * be used.
         */
        this.supportingText = '';
        /**
         * Override the input text CSS `direction`. Useful for RTL languages that use
         * LTR notation for fractions.
         */
        this.textDirection = '';
        // ARIA
        // TODO(b/210730484): replace with @soyParam annotation
        this.ariaAutoComplete = null;
        this.ariaControls = null;
        this.ariaActiveDescendant = null;
        this.ariaExpanded = null;
        // tslint:disable:decorator-placement
        // @ts-ignore(b/264292293): Use `override` with TS 4.9+
        this.role = null;
        this.name = '';
        // <input> properties
        /**
         * Defines the greatest value in the range of permitted values.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
         */
        this.max = '';
        /**
         * The maximum number of characters a user can enter into the text field. Set
         * to -1 for none.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
         */
        this.maxLength = -1;
        /**
         * Defines the most negative value in the range of permitted values.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
         */
        this.min = '';
        /**
         * The minimum number of characters a user can enter into the text field. Set
         * to -1 for none.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
         */
        this.minLength = -1;
        /**
         * A regular expression that the text field's value must match to pass
         * constraint validation.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
         */
        this.pattern = '';
        this.placeholder = '';
        /**
         * Indicates whether or not a user should be able to edit the text field's
         * value.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
         */
        this.readOnly = false;
        /**
         * Returns or sets the element's step attribute, which works with min and max
         * to limit the increments at which a numeric or date-time value can be set.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
         */
        this.step = '';
        // TODO(b/237284412): replace with exported types
        this.type = 'text';
        /**
         * Returns true when the text field has been interacted with. Native
         * validation errors only display in response to user interactions.
         */
        this.dirty = false;
        this.focused = false;
        /**
         * When set to true, the error text's `role="alert"` will be removed, then
         * re-added after an animation frame. This will re-announce an error message
         * to screen readers.
         */
        this.refreshErrorAlert = false;
        /**
         * Returns true when the text field's `value` property has been changed from
         * it's initial value.
         *
         * Setting `value` should always overwrite `defaultValue`, even when `value`
         * is an empty string. This flag ensures that behavior.
         */
        this.valueHasChanged = false;
        /**
         * Whether or not to ignore the next `value` change when computing
         * `valueHasChanged`.
         */
        this.ignoreNextValueChange = false;
        /**
         * Whether or not a native error has been reported via `reportValidity()`.
         */
        this.nativeError = false;
        /**
         * The validation message displayed from a native error via
         * `reportValidity()`.
         */
        this.nativeErrorText = '';
        /** @soyUniqueAttribute */
        this.counterId = 'counter';
        /** @soyUniqueAttribute */
        this.supportingTextId = 'support';
        this.addController(new FormController(this));
        // TODO(b/244574653): replace this.handleClick with this.focus
        this.addEventListener('click', this.handleClick);
        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }
    // tslint:enable:decorator-placement
    // FormElement
    get form() {
        return this.closest('form');
    }
    [getFormValue]() {
        return this.value;
    }
    /**
     * Gets or sets the direction in which selection occurred.
     */
    get selectionDirection() {
        return this.getInput().selectionDirection;
    }
    set selectionDirection(value) {
        this.getInput().selectionDirection = value;
    }
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    get selectionEnd() {
        return this.getInput().selectionEnd;
    }
    set selectionEnd(value) {
        this.getInput().selectionEnd = value;
    }
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    get selectionStart() {
        return this.getInput().selectionStart;
    }
    set selectionStart(value) {
        this.getInput().selectionStart = value;
    }
    /**
     * Returns the native validation error message that would be displayed upon
     * calling `reportValidity()`.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
     */
    get validationMessage() {
        return this.getInput().validationMessage;
    }
    /**
     * Returns a ValidityState object that represents the validity states of the
     * text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
     */
    get validity() {
        return this.getInput().validity;
    }
    /**
     * The text field's value as a number.
     */
    get valueAsNumber() {
        return this.getInput().valueAsNumber;
    }
    set valueAsNumber(value) {
        this.getInput().valueAsNumber = value;
        this.value = this.getInput().value;
    }
    /**
     * The text field's value as a Date.
     */
    get valueAsDate() {
        return this.getInput().valueAsDate;
    }
    set valueAsDate(value) {
        this.getInput().valueAsDate = value;
        this.value = this.getInput().value;
    }
    /**
     * Returns whether an element will successfully validate based on forms
     * validation rules and constraints.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate
     */
    get willValidate() {
        return this.getInput().willValidate;
    }
    /**
     * Checks the text field's native validation and returns whether or not the
     * element is valid.
     *
     * If invalid, this method will dispatch the `invalid` event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
     *
     * @return true if the text field is valid, or false if not.
     */
    checkValidity() {
        const { valid } = this.checkValidityAndDispatch();
        return valid;
    }
    /**
     * Focuses the text field's input text.
     */
    focus() {
        if (this.disabled || this.matches(':focus-within')) {
            // Don't shift focus from an element within the text field, like an icon
            // button, to the input when focus is requested.
            return;
        }
        // TODO(b/210731759): replace with super.focus() once SSR supports
        // delegating focus
        this.getInput().focus();
    }
    /**
     * Unfocuses the text field.
     */
    blur() {
        this.getInput().blur();
    }
    /**
     * Checks the text field's native validation and returns whether or not the
     * element is valid.
     *
     * If invalid, this method will dispatch the `invalid` event.
     *
     * This method will display or clear an error text message equal to the text
     * field's `validationMessage`, unless the invalid event is canceled.
     *
     * Use `setCustomValidity()` to customize the `validationMessage`.
     *
     * This method can also be used to re-announce error messages to screen
     * readers.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
     *
     * @return true if the text field is valid, or false if not.
     */
    reportValidity() {
        const { valid, canceled } = this.checkValidityAndDispatch();
        if (!canceled) {
            const prevMessage = this.getErrorText();
            this.nativeError = !valid;
            this.nativeErrorText = this.validationMessage;
            const needsRefresh = this.shouldErrorAnnounce() && prevMessage === this.getErrorText();
            if (needsRefresh) {
                this.refreshErrorAlert = true;
            }
        }
        return valid;
    }
    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select() {
        this.getInput().select();
    }
    /**
     * Sets the text field's native validation error message. This is used to
     * customize `validationMessage`.
     *
     * When the error is not an empty string, the text field is considered invalid
     * and `validity.customError` will be true.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
     *
     * @param error The error message to display.
     */
    setCustomValidity(error) {
        this.getInput().setCustomValidity(error);
    }
    setRangeText(...args) {
        // Calling setRangeText with 1 vs 3-4 arguments has different behavior.
        // Use spread syntax and type casting to ensure correct usage.
        this.getInput().setRangeText(...args);
        this.value = this.getInput().value;
    }
    /**
     * Sets the start and end positions of a selection in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     *
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start, end, direction) {
        this.getInput().setSelectionRange(start, end, direction);
    }
    /**
     * Decrements the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
     *
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement) {
        const input = this.getInput();
        input.stepDown(stepDecrement);
        this.value = input.value;
    }
    /**
     * Increments the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
     *
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement) {
        const input = this.getInput();
        input.stepUp(stepIncrement);
        this.value = input.value;
    }
    /**
     * Reset the text field to its default value.
     */
    reset() {
        this.dirty = false;
        this.valueHasChanged = false;
        this.ignoreNextValueChange = true;
        this.value = this.defaultValue;
        this.nativeError = false;
        this.nativeErrorText = '';
    }
    /** @soyTemplate */
    render() {
        return html `
       <span class="text-field ${classMap(this.getRenderClasses())}">
         ${this.renderField()}
       </span>
     `;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            'disabled': this.disabled,
            'error': !this.disabled && this.getError(),
        };
    }
    /** @soyTemplate */
    getError() {
        return this.error || this.nativeError;
    }
    /** @soyTemplate */
    renderField() {
        const prefix = this.renderPrefix();
        const suffix = this.renderSuffix();
        const input = this.renderInput();
        const inputValue = this.getInputValue();
        return staticHtml `<${this.fieldTag}
      class="field"
      ?disabled=${this.disabled}
      ?error=${this.getError()}
      ?focused=${this.focused}
      ?hasEnd=${this.hasTrailingIcon}
      ?hasStart=${this.hasLeadingIcon}
      .label=${this.label}
      ?populated=${!!inputValue}
      ?required=${this.required}
    >
      ${this.renderLeadingIcon()}
      ${prefix}${input}${suffix}
      ${this.renderTrailingIcon()}
      ${this.renderSupportingText()}
      ${this.renderCounter()}
    </${this.fieldTag}>`;
    }
    /**
     * @soyTemplate
     * @slotName start
     */
    renderLeadingIcon() {
        return html `
       <span class="icon leading" slot="start">
         <slot name="leadingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
    }
    /**
     * @soyTemplate
     * @slotName end
     */
    renderTrailingIcon() {
        return html `
       <span class="icon trailing" slot="end">
         <slot name="trailingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
    }
    /** @soyTemplate */
    renderInput() {
        // TODO(b/237283903): remove when custom isTruthy directive is supported
        const placeholderValue = this.placeholder || undefined;
        const ariaActiveDescendantValue = this.ariaActiveDescendant || undefined;
        const ariaAutoCompleteValue = this.ariaAutoComplete || undefined;
        const ariaControlsValue = this.ariaControls || undefined;
        const ariaDescribedByValue = this.getAriaDescribedBy() || undefined;
        const ariaExpandedValue = this.ariaExpanded || undefined;
        const ariaLabelValue = this.ariaLabel || this.label || undefined;
        const ariaLabelledByValue = this.ariaLabelledBy || undefined;
        const maxValue = this.max || undefined;
        const maxLengthValue = this.maxLength > -1 ? this.maxLength : undefined;
        const minValue = this.min || undefined;
        const minLengthValue = this.minLength > -1 ? this.minLength : undefined;
        const patternValue = this.pattern || undefined;
        const roleValue = this.role || undefined;
        const stepValue = this.step || undefined;
        /** @styleMap */
        const style = { direction: this.textDirection };
        // TODO(b/243805848): remove `as unknown as number` once lit analyzer is
        // fixed
        return html `<input
       style=${styleMap(style)}
       aria-activedescendant=${ifDefined(ariaActiveDescendantValue)}
       aria-autocomplete=${ifDefined(ariaAutoCompleteValue)}
       aria-controls=${ifDefined(ariaControlsValue)}
       aria-describedby=${ifDefined(ariaDescribedByValue)}
       aria-expanded=${ifDefined(ariaExpandedValue)}
       aria-invalid=${this.getError()}
       aria-label=${ifDefined(ariaLabelValue)}
       aria-labelledby=${ifDefined(ariaLabelledByValue)}
       ?disabled=${this.disabled}
       max=${ifDefined(maxValue)}
       maxlength=${ifDefined(maxLengthValue)}
       min=${ifDefined(minValue)}
       minlength=${ifDefined(minLengthValue)}
       pattern=${ifDefined(patternValue)}
       placeholder=${ifDefined(placeholderValue)}
       role=${ifDefined(roleValue)}
       ?readonly=${this.readOnly}
       ?required=${this.required}
       step=${ifDefined(stepValue)}
       type=${this.type}
       .value=${live(this.getInputValue())}
       @change=${this.redispatchEvent}
       @input=${this.handleInput}
       @select=${this.redispatchEvent}
     >`;
    }
    /** @soyTemplate */
    getInputValue() {
        const alwaysShowValue = this.dirty || this.valueHasChanged;
        return alwaysShowValue ? this.value : this.defaultValue || this.value;
    }
    /** @soyTemplate */
    getAriaDescribedBy() {
        const hasSupport = !!this.getSupportingText();
        const hasCounter = this.hasCounter();
        // TODO(b/244609052): remove parens
        return (hasSupport || hasCounter) ?
            `${hasSupport ? this.supportingTextId : ''} ${hasCounter ? this.counterId : ''}` :
            '';
    }
    /** @soyTemplate */
    renderPrefix() {
        return this.prefixText ?
            html `<span class="prefix">${this.prefixText}</span>` :
            html ``;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderAffix(/* isSuffix */ false);
    }
    /** @soyTemplate */
    renderSuffix() {
        return this.suffixText ?
            html `<span class="suffix">${this.suffixText}</span>` :
            html ``;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderAffix(/* isSuffix */ true);
    }
    /**
     * @soyTemplate
     * @slotName supporting-text
     */
    renderSupportingText() {
        const shouldAlert = this.shouldErrorAnnounce();
        const text = this.getSupportingText();
        const template = html `<span id=${this.supportingTextId}
      slot="supporting-text"
      role=${ifDefined(shouldAlert ? 'alert' : undefined)}>${text}</span>`;
        return text ? template : html ``;
    }
    /** @soyTemplate */
    getSupportingText() {
        const errorText = this.getErrorText();
        return this.getError() && errorText ? errorText : this.supportingText;
    }
    /** @soyTemplate */
    getErrorText() {
        return this.error ? this.errorText : this.nativeErrorText;
    }
    /** @soyTemplate */
    shouldErrorAnnounce() {
        // Announce if there is an error and error text visible.
        // If refreshErrorAlert is true, do not announce. This will remove the
        // role="alert" attribute. Another render cycle will happen after an
        // animation frame to re-add the role.
        return this.getError() && !!this.getErrorText() && !this.refreshErrorAlert;
    }
    /**
     * @soyTemplate
     * @slotName supporting-text-end
     */
    renderCounter() {
        const counter = html `<span id=${this.counterId}
       class="counter"
       slot="supporting-text-end">${this.getCounterText()}</span>`;
        // TODO(b/244473435): add aria-label and announcements
        return this.hasCounter() ? counter : html ``;
    }
    // TODO(b/244197198): replace with !!this.getCounterText()
    /** @soyTemplate */
    hasCounter() {
        return this.maxLength > -1;
    }
    /** @soyTemplate */
    getCounterText() {
        // TODO(b/244197198): replace with string return
        const length = this.value.length;
        return this.hasCounter() ? html `${length} / ${this.maxLength}` : html ``;
    }
    update(changedProperties) {
        // Consider a value change anything that is not the initial empty string
        // value.
        const valueHasChanged = changedProperties.has('value') &&
            changedProperties.get('value') !== undefined;
        if (valueHasChanged && !this.ignoreNextValueChange) {
            this.valueHasChanged = true;
        }
        if (this.ignoreNextValueChange) {
            this.ignoreNextValueChange = false;
        }
        super.update(changedProperties);
    }
    updated(changedProperties) {
        // If a property such as `type` changes and causes the internal <input>
        // value to change without dispatching an event, re-sync it.
        const value = this.getInput().value;
        if (this.value !== value) {
            // Don't consider these updates (such as setting `defaultValue`) as
            // the developer directly changing the `value`.
            this.ignoreNextValueChange = true;
            // Note this is typically inefficient in updated() since it schedules
            // another update. However, it is needed for the <input> to fully render
            // before checking its value.
            this.value = value;
        }
        if (this.refreshErrorAlert) {
            // The past render cycle removed the role="alert" from the error message.
            // Re-add it after an animation frame to re-announce the error.
            requestAnimationFrame(() => {
                this.refreshErrorAlert = false;
            });
        }
    }
    /** @bubbleWizEvent */
    handleClick() {
        this.focus();
    }
    /** @bubbleWizEvent */
    handleFocusin(event) {
        this.focused = true;
    }
    /** @bubbleWizEvent */
    handleFocusout(event) {
        if (this.matches(':focus-within')) {
            // Changing focus to another child within the text field, like a button
            return;
        }
        this.focused = false;
    }
    handleInput(event) {
        this.dirty = true;
        this.value = event.target.value;
        this.redispatchEvent(event);
    }
    redispatchEvent(event) {
        redispatchEvent(this, event);
    }
    getInput() {
        if (!this.input) {
            // If the input is not yet defined, synchronously render.
            // e.g.
            // const textField = document.createElement('md-outlined-text-field');
            // document.body.appendChild(textField);
            // textField.focus(); // synchronously render
            this.connectedCallback();
            this.scheduleUpdate();
        }
        if (this.isUpdatePending) {
            // If there are pending updates, synchronously perform them. This ensures
            // that constraint validation properties (like `required`) are synced
            // before interacting with input APIs that depend on them.
            this.scheduleUpdate();
        }
        return this.input;
    }
    checkValidityAndDispatch() {
        const valid = this.getInput().checkValidity();
        let canceled = false;
        if (!valid) {
            canceled = !this.dispatchEvent(new Event('invalid', { cancelable: true }));
        }
        return { valid, canceled };
    }
    handleIconChange() {
        this.hasLeadingIcon = this.leadingIcons.length > 0;
        this.hasTrailingIcon = this.trailingIcons.length > 0;
    }
}
TextField.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "error", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "errorText", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], TextField.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "required", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "value", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "defaultValue", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "prefixText", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "suffixText", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], TextField.prototype, "hasLeadingIcon", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], TextField.prototype, "hasTrailingIcon", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "supportingText", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "textDirection", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-autocomplete', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaAutoComplete", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-controls', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaControls", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-activedescendant', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaActiveDescendant", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-expanded', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaExpanded", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: String, attribute: 'data-aria-labelledby', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaLabelledBy", void 0);
__decorate([
    property({ type: String, attribute: 'data-role', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "role", void 0);
__decorate([
    property({ type: String, reflect: true, converter: stringConverter }),
    __metadata("design:type", Object)
], TextField.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "max", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], TextField.prototype, "maxLength", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "min", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], TextField.prototype, "minLength", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "pattern", void 0);
__decorate([
    property({ type: String, reflect: true, converter: stringConverter }),
    __metadata("design:type", Object)
], TextField.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "readOnly", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "step", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], TextField.prototype, "type", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "dirty", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "focused", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "refreshErrorAlert", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "valueHasChanged", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "nativeError", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], TextField.prototype, "nativeErrorText", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], TextField.prototype, "input", void 0);
__decorate([
    queryAssignedElements({ slot: 'leadingicon' }),
    __metadata("design:type", Array)
], TextField.prototype, "leadingIcons", void 0);
__decorate([
    queryAssignedElements({ slot: 'trailingicon' }),
    __metadata("design:type", Array)
], TextField.prototype, "trailingIcons", void 0);
//# sourceMappingURL=text-field.js.map