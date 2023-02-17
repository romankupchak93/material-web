/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TextLinkButton } from './lib/text-link-button.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-text-link-button': MdTextLinkButton;
    }
}
/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment. This is a linkable variant.
 *
 * @description
 * __Emphasis:__ Low emphasis – For optional or supplementary actions with the
 * least amount of prominence
 *
 * __Rationale:__ Text buttons have less visual prominence, so should be used
 * for low emphasis actions, such as an alternative option.
 *
 * __Example usages:__
 * - Learn more
 * - View all
 * - Change account
 * - Turn on
 *
 * @final
 * @suppress {visibility}
 */
export declare class MdTextLinkButton extends TextLinkButton {
    static styles: any[];
}
