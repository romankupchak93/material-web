/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Ripple } from './ripple.js';
declare global {
    interface HTMLElementTagNameMap {
        'test-ripple': TestRipple;
    }
}
declare class TestRipple extends Ripple {
}
export {};
