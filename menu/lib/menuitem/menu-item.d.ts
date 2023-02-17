/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemEl } from '../../../list/lib/listitem/list-item.js';
import { ARIARole } from '../../../types/aria.js';
import { MenuItem } from '../shared.js';
/**
 * @fires close-menu {CloseMenuEvent}
 */
export declare class MenuItemEl extends ListItemEl implements MenuItem {
    role: ARIARole;
    /**
     * READONLY: self-identifies as a menu item and sets its identifying attribute
     */
    isMenuItem: boolean;
    /**
     * Keeps the menu open if clicked or keyboard selected.
     */
    keepOpen: boolean;
    /**
     * Used for overriding e.g. sub-menu-item.
     */
    protected keepOpenOnClick: boolean;
    protected onClick(): void;
    protected onKeydown(e: KeyboardEvent): void;
}