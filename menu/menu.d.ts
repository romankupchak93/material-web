/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Menu } from './lib/menu.js';
export { ListItem } from '../list/lib/listitem/list-item.js';
export { Corner, DefaultFocusState } from './lib/menu.js';
export { CloseMenuEvent, DeactivateItemsEvent, MenuItem } from './lib/shared.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-menu': MdMenu;
    }
}
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menus appear when users interact with a button, action, or other control.
 *
 * They can be opened from a variety of elements, most commonly icon buttons,
 * buttons, and text fields.
 *
 * md-menu listens for the `close-menu` and `deselect-items` events.
 *
 * - `close-menu` closes the menu when dispatched from a child element.
 * - `deselect-items` deselects all of its immediate menu-item children.
 *
 * @example
 * ```html
 * <div style="position:relative;">
 *   <button
 *       class="anchor"
 *       ${ref(anchorRef)}
 *       @click=${() => this.menuRef.value.show()}>
 *     Click to open menu
 *   </button>
 *   <!--
 *     `has-overflow` is required when using a submenu which overflows the
 *     menu's contents
 *   -->
 *   <md-menu has-overflow ${ref(menuRef)} ${(el) => el.anchor =
 * anchorRef.value}> <md-menu-item header="This is a header"></md-menu-item>
 *     <md-sub-menu-item header="this is a submenu item">
 *       <md-menu slot="submenu">
 *         <md-menu-item
 *           header="This is an item inside a submenu"></md-menu-item>
 *       </md-menu>
 *     </md-sub-menu>
 *   </md-menu>
 * </div>
 * ```
 *
 * @final
 * @suppress {visibility}
 */
export declare class MdMenu extends Menu {
    static styles: any[];
}