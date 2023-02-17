/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ActionElement } from './action-element.js';
declare global {
    interface HTMLElementTagNameMap {
        'test-action-element': TestActionElement;
    }
}
declare class TestActionElement extends ActionElement {
    disabled: boolean;
}
export {};
