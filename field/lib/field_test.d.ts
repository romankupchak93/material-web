/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Field } from './field.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-test-field': TestField;
    }
}
declare class TestField extends Field {
    get labelText(): string;
    protected renderMiddleContents(): import("lit-html").TemplateResult<1>;
}
export {};
