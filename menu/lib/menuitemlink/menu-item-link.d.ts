/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemLink } from '../../../list/lib/listitemlink/list-item-link.js';
import { ARIARole } from '../../../types/aria.js';
import { MenuItem } from '../shared.js';
/**
 * @fires close-menu {CloseMenuEvent}
 */
export declare class MenuItemLink extends ListItemLink implements MenuItem {
    role: ARIARole;
    /**
     * READONLY: self-identifies as a menu item and sets its identifying attribute
     */
    isMenuItem: boolean;
    /**
     * Keeps the menu open if clicked or keyboard selected.
     */
    keepOpen: boolean;
    protected keepOpenOnClick: boolean;
    protected onClick(): void;
    protected onKeydown(e: KeyboardEvent): void;
}