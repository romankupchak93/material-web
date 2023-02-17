/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Switch } from './switch.js';
declare class TestSwitch extends Switch {
}
declare global {
    interface HTMLElementTagNameMap {
        'md-test-switch': TestSwitch;
    }
}
export {};
