/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
import { Dialog } from './lib/dialog.js';
/**
 * Test harness for dialog.
 */
export declare class DialogHarness extends Harness<Dialog> {
    getInteractiveElement(): Promise<HTMLDialogElement>;
    isOpening(): Promise<boolean>;
    isClosing(): Promise<boolean>;
    transitionComplete(): Promise<void>;
    isDialogVisible(): Promise<boolean>;
    isScrimVisible(): Promise<boolean>;
}
