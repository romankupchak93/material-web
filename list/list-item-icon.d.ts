/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemIcon } from './lib/icon/list-item-icon.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-list-item-icon': MdListItemIcon;
    }
}
/**
 * @summary A material icon that is expected to be slotted into a list item.
 *
 * @final
 * @suppress {visibility}
 */
export declare class MdListItemIcon extends ListItemIcon {
    static styles: any[];
}