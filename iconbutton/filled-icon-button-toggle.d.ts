/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ClassInfo } from 'lit/directives/class-map.js';
import { IconButtonToggle } from './lib/icon-button-toggle.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-filled-icon-button-toggle': MdFilledIconButtonToggle;
    }
}
/**
 * @summary Icon buttons help people take supplementary actions with a single
 * tap. This variant can toggle between icons.
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
export declare class MdFilledIconButtonToggle extends IconButtonToggle {
    static styles: any[];
    protected getRenderClasses(): ClassInfo;
}