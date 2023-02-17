/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MdNavigationTab } from './navigation-tab.js';
declare class TestNavigationTab extends MdNavigationTab {
}
declare global {
    interface HTMLElementTagNameMap {
        'md-test-navigation-tab': TestNavigationTab;
    }
}
export {};
