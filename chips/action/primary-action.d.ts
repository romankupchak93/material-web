/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PrimaryAction } from './lib/primary-action.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-primary-action': MdPrimaryAction;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdPrimaryAction extends PrimaryAction {
}