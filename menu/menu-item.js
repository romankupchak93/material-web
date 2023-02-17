/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as listItemStyles } from '../list/lib/listitem/list-item-styles.css.js';
import { MenuItemEl } from './lib/menuitem/menu-item.js';
import { styles as privateProps } from './lib/menuitem/menu-item-private-styles.css.js';
import { styles } from './lib/menuitem/menu-item-styles.css.js';
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
 * @final
 * @suppress {visibility}
 */
let MdMenuItem = class MdMenuItem extends MenuItemEl {
};
MdMenuItem.styles = [privateProps, listItemStyles, styles];
MdMenuItem = __decorate([
    customElement('md-menu-item')
], MdMenuItem);
export { MdMenuItem };
//# sourceMappingURL=menu-item.js.map