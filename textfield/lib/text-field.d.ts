/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { StaticValue } from 'lit/static-html.js';
import { getFormValue } from '../../controller/form-controller.js';
import { ARIAAutoComplete, ARIAExpanded, ARIARole } from '../../types/aria.js';
/**
 * Input types that are compatible with the text field.
 */
export declare type TextFieldType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
/**
 * Input types that are not fully supported for the text field.
 */
export declare type UnsupportedTextFieldType = 'color' | 'date' | 'datetime-local' | 'file' | 'month' | 'time' | 'week';
/**
 * Input types that are incompatible with the text field.
 */
export declare type InvalidTextFieldType = 'button' | 'checkbox' | 'hidden' | 'image' | 'radio' | 'range' | 'reset' | 'submit';
/** @soyCompatible */
export declare abstract class TextField extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    disabled: boolean;
    /**
     * Gets or sets whether or not the text field is in a visually invalid state.
     *
     * Calling `reportValidity()` will automatically update `error`.
     */
    error: boolean;
    /**
     * The error message that replaces supporting text when `error` is true. If
     * `errorText` is an empty string, then the supporting text will continue to
     * show.
     *
     * Calling `reportValidity()` will automatically update `errorText` to the
     * native `validationMessage`.
     */
    errorText: string;
    label?: string;
    required: boolean;
    /**
     * The current value of the text field. It is always a string.
     *
     * This is equal to `defaultValue` before user input.
     */
    value: string;
    /**
     * The default value of the text field. Before user input, changing the
     * default value will update `value` as well.
     *
     * When the text field is reset, its `value` will be set to this default
     * value.
     */
    defaultValue: string;
    /**
     * An optional prefix to display before the input value.
     */
    prefixText: string;
    /**
     * An optional suffix to display after the input value.
     */
    suffixText: string;
    /**
     * Whether or not the text field has a leading icon. Used for SSR.
     */
    hasLeadingIcon: boolean;
    /**
     * Whether or not the text field has a trailing icon. Used for SSR.
     */
    hasTrailingIcon: boolean;
    /**
     * Conveys additional information below the text field, such as how it should
     * be used.
     */
    supportingText: string;
    /**
     * Override the input text CSS `direction`. Useful for RTL languages that use
     * LTR notation for fractions.
     */
    textDirection: string;
    ariaAutoComplete: ARIAAutoComplete | null;
    ariaControls: string | null;
    ariaActiveDescendant: string | null;
    ariaExpanded: ARIAExpanded | null;
    /**
     * The `aria-label` of the text field's input.
     */
    ariaLabel: string;
    /**
     * The `aria-labelledby` of the text field's input.
     *
     * Note: currently only usable in SSR light DOM.
     */
    ariaLabelledBy: string;
    role: ARIARole | null;
    get form(): HTMLFormElement;
    name: string;
    [getFormValue](): string;
    /**
     * Defines the greatest value in the range of permitted values.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
     */
    max: string;
    /**
     * The maximum number of characters a user can enter into the text field. Set
     * to -1 for none.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
     */
    maxLength: number;
    /**
     * Defines the most negative value in the range of permitted values.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
     */
    min: string;
    /**
     * The minimum number of characters a user can enter into the text field. Set
     * to -1 for none.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
     */
    minLength: number;
    /**
     * A regular expression that the text field's value must match to pass
     * constraint validation.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
     */
    pattern: string;
    placeholder: string;
    /**
     * Indicates whether or not a user should be able to edit the text field's
     * value.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
     */
    readOnly: boolean;
    /**
     * Gets or sets the direction in which selection occurred.
     */
    get selectionDirection(): 'forward' | 'backward' | 'none' | null;
    set selectionDirection(value: 'forward' | 'backward' | 'none' | null);
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    get selectionEnd(): number | null;
    set selectionEnd(value: number | null);
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    get selectionStart(): number | null;
    set selectionStart(value: number | null);
    /**
     * Returns or sets the element's step attribute, which works with min and max
     * to limit the increments at which a numeric or date-time value can be set.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
     */
    step: string;
    type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'color' | 'date' | 'datetime-local' | 'file' | 'month' | 'time' | 'week';
    /**
     * Returns the native validation error message that would be displayed upon
     * calling `reportValidity()`.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
     */
    get validationMessage(): string;
    /**
     * Returns a ValidityState object that represents the validity states of the
     * text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
     */
    get validity(): ValidityState;
    /**
     * The text field's value as a number.
     */
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    /**
     * The text field's value as a Date.
     */
    get valueAsDate(): Date | null;
    set valueAsDate(value: Date | null);
    /**
     * Returns whether an element will successfully validate based on forms
     * validation rules and constraints.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate
     */
    get willValidate(): boolean;
    /**
     * Returns true when the text field has been interacted with. Native
     * validation errors only display in response to user interactions.
     */
    protected dirty: boolean;
    protected focused: boolean;
    /**
     * When set to true, the error text's `role="alert"` will be removed, then
     * re-added after an animation frame. This will re-announce an error message
     * to screen readers.
     */
    protected refreshErrorAlert: boolean;
    /**
     * Returns true when the text field's `value` property has been changed from
     * it's initial value.
     *
     * Setting `value` should always overwrite `defaultValue`, even when `value`
     * is an empty string. This flag ensures that behavior.
     */
    protected valueHasChanged: boolean;
    /**
     * Whether or not to ignore the next `value` change when computing
     * `valueHasChanged`.
     */
    protected ignoreNextValueChange: boolean;
    /**
     * Whether or not a native error has been reported via `reportValidity()`.
     */
    protected nativeError: boolean;
    /**
     * The validation message displayed from a native error via
     * `reportValidity()`.
     */
    protected nativeErrorText: string;
    protected readonly input?: HTMLInputElement | null;
    protected abstract readonly fieldTag: StaticValue;
    /** @soyUniqueAttribute */
    private readonly counterId;
    private readonly leadingIcons;
    private readonly trailingIcons;
    /** @soyUniqueAttribute */
    private readonly supportingTextId;
    constructor();
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
    checkValidity(): boolean;
    /**
     * Focuses the text field's input text.
     */
    focus(): void;
    /**
     * Unfocuses the text field.
     */
    blur(): void;
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
    reportValidity(): boolean;
    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select(): void;
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
    setCustomValidity(error: string): void;
    /**
     * Replaces a range of text with a new string.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
     */
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     *
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none'): void;
    /**
     * Decrements the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
     *
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement?: number): void;
    /**
     * Increments the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
     *
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement?: number): void;
    /**
     * Reset the text field to its default value.
     */
    reset(): void;
    /** @soyTemplate */
    render(): TemplateResult;
    /** @soyTemplate */
    protected getRenderClasses(): ClassInfo;
    /** @soyTemplate */
    protected getError(): boolean;
    /** @soyTemplate */
    protected renderField(): TemplateResult;
    /**
     * @soyTemplate
     * @slotName start
     */
    protected renderLeadingIcon(): TemplateResult;
    /**
     * @soyTemplate
     * @slotName end
     */
    protected renderTrailingIcon(): TemplateResult;
    /** @soyTemplate */
    protected renderInput(): TemplateResult;
    /** @soyTemplate */
    protected getInputValue(): string;
    /** @soyTemplate */
    protected getAriaDescribedBy(): string;
    /** @soyTemplate */
    protected renderPrefix(): TemplateResult;
    /** @soyTemplate */
    protected renderSuffix(): TemplateResult;
    /**
     * @soyTemplate
     * @slotName supporting-text
     */
    protected renderSupportingText(): TemplateResult;
    /** @soyTemplate */
    protected getSupportingText(): string;
    /** @soyTemplate */
    protected getErrorText(): string;
    /** @soyTemplate */
    protected shouldErrorAnnounce(): boolean;
    /**
     * @soyTemplate
     * @slotName supporting-text-end
     */
    protected renderCounter(): TemplateResult;
    /** @soyTemplate */
    protected hasCounter(): boolean;
    /** @soyTemplate */
    protected getCounterText(): TemplateResult;
    protected update(changedProperties: PropertyValues<TextField>): void;
    protected updated(changedProperties: PropertyValues): void;
    /** @bubbleWizEvent */
    protected handleClick(): void;
    /** @bubbleWizEvent */
    protected handleFocusin(event: FocusEvent): void;
    /** @bubbleWizEvent */
    protected handleFocusout(event: FocusEvent): void;
    protected handleInput(event: InputEvent): void;
    protected redispatchEvent(event: Event): void;
    protected getInput(): HTMLInputElement;
    private checkValidityAndDispatch;
    private handleIconChange;
}