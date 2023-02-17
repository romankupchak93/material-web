/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as privateProps } from './lib/listitem/list-item-private-styles.css.js';
import { styles } from './lib/listitem/list-item-styles.css.js';
import { ListItemLink } from './lib/listitemlink/list-item-link.js';
/**
 * @summary
 * Lists are continuous, vertical indexes of text or images. Items are placed
 * inside the list. This is a linkable variant.
 *
 * @description
 * Lists consist of one or more list items, and can contain actions represented
 * by icons and text. List items come in three sizes: one-line, two-line, and
 * three-line.
 *
 * __Takeaways:__
 *
 * - Lists should be sorted in logical ways that make content easy to scan, such
 *   as alphabetical, numerical, chronological, or by user preference.
 * - Lists present content in a way that makes it easy to identify a specific
 *   item in a collection and act on it.
 * - Lists should present icons, text, and actions in a consistent format.
 *
 * @final
 * @suppress {visibility}
 */
let MdListItemLink = class MdListItemLink extends ListItemLink {
};
MdListItemLink.styles = [privateProps, styles];
MdListItemLink = __decorate([
    customElement('md-list-item-link')
], MdListItemLink);
export { MdListItemLink };
//# sourceMappingURL=list-item-link.js.map