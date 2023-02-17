/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, TemplateResult } from 'lit';
import { FormElement, getFormValue } from './form-controller.js';
declare global {
    interface HTMLElementTagNameMap {
        'my-form-element': MyFormElement;
        'my-form-data-element': MyFormDataElement;
        'my-checked-form-element': MyCheckedFormElement;
        'my-checked-form-associated-element': MyCheckedFormAssociatedElement;
    }
}
declare class MyFormElement extends LitElement implements FormElement {
    get form(): HTMLFormElement;
    disabled: boolean;
    name: string;
    value: string;
    [getFormValue](): string | null | FormData;
    constructor();
}
declare class MyFormDataElement extends MyFormElement {
    [getFormValue](): FormData;
}
declare class MyCheckedFormElement extends MyFormElement {
    checked: boolean;
    checkedEl: HTMLDivElement;
    constructor();
    setupActivationClickHandler(): void;
    render(): TemplateResult<1>;
    focus(): void;
}
declare class MyCheckedFormAssociatedElement extends MyCheckedFormElement {
    static formAssociated: boolean;
}
export {};
