/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemLink } from './lib/listitemlink/list-item-link.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-list-item-link': MdListItemLink;
    }
}
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
export declare class MdListItemLink extends ListItemLink {
    static styles: any[];
}
