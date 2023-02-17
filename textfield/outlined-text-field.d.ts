/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../field/outlined-field.js';
import { OutlinedTextField } from './lib/outlined-text-field.js';
export { TextFieldType } from './lib/text-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-outlined-text-field': MdOutlinedTextField;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdOutlinedTextField extends OutlinedTextField {
    static styles: any[];
    protected readonly fieldTag: import("lit-html/static.js").StaticValue;
}
