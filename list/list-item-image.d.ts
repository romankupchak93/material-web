/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemImage } from './lib/image/list-item-image.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-list-item-image': MdListItemImage;
    }
}
/**
 * @summary An image that is expected to be slotted into a list item.
 *
 * @final
 * @suppress {visibility}
 */
export declare class MdListItemImage extends ListItemImage {
    static styles: any[];
}