/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ClassInfo } from 'lit/directives/class-map.js';
import { LinkIconButton } from './lib/link-icon-button.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-standard-link-icon-button': MdStandardLinkIconButton;
    }
}
/**
 * @summary Icon buttons help people take supplementary actions with a single
 * tap. This is a linkable variant.
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
export declare class MdStandardLinkIconButton extends LinkIconButton {
    static styles: any[];
    protected getRenderClasses(): ClassInfo;
}