/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ARIARole } from '../../../types/aria.js';
import { Corner, Menu } from '../menu.js';
import { MenuItemEl } from '../menuitem/menu-item.js';
import { CloseMenuEvent } from '../shared.js';
/**
 * @fires deactivate-items {DeactivateItemsEvent} Requests the parent menu to
 *     deselect other items when a submenu opens
 */
export declare class SubMenuItem extends MenuItemEl {
    role: ARIARole;
    /**
     * The anchorCorner to set on the submenu.
     */
    anchorCorner: Corner;
    /**
     * The menuCorner to set on the submenu.
     */
    menuCorner: Corner;
    /**
     * The delay between pointerenter and submenu opening.
     */
    hoverOpenDelay: number;
    /**
     * The delay between ponterleave and the submenu closing.
     */
    hoverCloseDelay: number;
    protected menus: Menu[];
    protected keepOpenOnClick: boolean;
    protected previousOpenTimeout: number;
    protected previousCloseTimeout: number;
    protected submenuOpen: boolean;
    protected get submenuEl(): Menu | undefined;
    /**
     * Starts the default 400ms countdown to open the submenu.
     */
    protected onPointerenter: () => void;
    /**
     * Starts the default 400ms countdown to close the submenu.
     */
    protected onPointerleave: () => void;
    protected onClick(): void;
    /**
     * On item keydown handles opening the submenu.
     */
    protected onKeydown(e: KeyboardEvent): void;
    /**
     * Render the submenu at the end
     */
    protected renderEnd(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the slot for the submenu.
     */
    protected renderSubMenu(): import("lit-html").TemplateResult<1>;
    protected onCloseSubmenu(e: CloseMenuEvent): void;
    protected onSubMenuKeydown(e: KeyboardEvent): Promise<void>;
    /**
     * Shows the submenu.
     *
     * @param onOpened A function to call after the menu is opened.
     */
    show(onOpened?: () => void): void;
    /**
     * Closes the submenu.
     *
     * @param onClosed A function to call after the menu is closed.
     */
    close(onClosed?: () => void): void;
    /**
     * Determines whether the given KeyboardEvent code is one that should open
     * the submenu. This is RTL-aware. By default, left, right, space, or enter.
     *
     * @param code The native KeyboardEvent code.
     * @return Whether or not the key code should open the submenu.
     */
    protected isSubmenuOpenKey(code: string): boolean;
    /**
     * Determines whether the given KeyboardEvent code is one that should close
     * the submenu. This is RTL-aware. By default right, left, or escape.
     *
     * @param code The native KeyboardEvent code.
     * @return Whether or not the key code should close the submenu.
     */
    protected isSubmenuCloseKey(code: string): boolean;
}