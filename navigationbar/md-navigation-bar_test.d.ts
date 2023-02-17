/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MdNavigationTab } from '../navigationtab/navigation-tab.js';
import { MdNavigationBar } from './navigation-bar.js';
declare class TestMdNavigationBar extends MdNavigationBar {
}
declare class TestMdNavigationTab extends MdNavigationTab {
}
declare global {
    interface HTMLElementTagNameMap {
        'md-test-navigation-bar': TestMdNavigationBar;
        'md-test-navigation-bar-tab': TestMdNavigationTab;
    }
}
export {};
