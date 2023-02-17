/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as listItemStyles } from '../list/lib/listitem/list-item-styles.css.js';
import { styles as privateProps } from './lib/menuitem/menu-item-private-styles.css.js';
import { styles } from './lib/menuitem/menu-item-styles.css.js';
import { MenuItemLink } from './lib/menuitemlink/menu-item-link.js';
export { CloseMenuEvent, DeactivateItemsEvent } from './lib/shared.js';
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menu items are the selectable choices within the menu. Menu items must
 * implement the `MenuItem` interface and also have the `md-menu-item`
 * attribute. Additionally menu items are list items so they must also have the
 * `md-list-item` attribute.
 *
 * Menu items can control a menu by selectively firing the `close-menu` and
 * `deselect-items` events.
 *
 * This is a linkable variant.
 *
 * @final
 * @suppress {visibility}
 */
let MdMenuItemLink = class MdMenuItemLink extends MenuItemLink {
};
MdMenuItemLink.styles = [privateProps, listItemStyles, styles];
MdMenuItemLink = __decorate([
    customElement('md-menu-item-link')
], MdMenuItemLink);
export { MdMenuItemLink };
//# sourceMappingURL=menu-item-link.js.map