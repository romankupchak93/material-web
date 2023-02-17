/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FilledField } from './filled-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-test-filled-field': TestFilledField;
    }
}
declare class TestFilledField extends FilledField {
    get strokeTransformOriginProp(): string;
}
export {};
