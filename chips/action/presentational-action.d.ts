/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PresentationalAction } from './lib/presentational-action.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-presentational-action': MdPresentationalAction;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdPresentationalAction extends PresentationalAction {
}