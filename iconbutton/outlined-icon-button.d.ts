/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ClassInfo } from 'lit/directives/class-map.js';
import { IconButton } from './lib/icon-button.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-outlined-icon-button': MdOutlinedIconButton;
    }
}
/**
 * @summary Icon buttons help people take supplementary actions with a single
 * tap.
 *
 * @description
 * __Emphasis:__ Low emphasis – For optional or supplementary actions with the
 * least amount of prominence.
 *
 * __Rationale:__ The most compact and unobtrusive type of button, icon buttons
 * are used for optional supplementary actions such as "Bookmark" or "Star."
 *
 * __Example usages:__
 * - Add to Favorites
 * - Print
 */
export declare class MdOutlinedIconButton extends IconButton {
    static styles: any[];
    protected getRenderClasses(): ClassInfo;
}