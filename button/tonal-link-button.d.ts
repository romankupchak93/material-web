/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TonalLinkButton } from './lib/tonal-link-button.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-tonal-link-button': MdTonalLinkButton;
    }
}
/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment. This is a linkable variant.
 *
 * @description
 * __Emphasis:__ Medium emphasis – For important actions that don’t distract
 * from other onscreen elements.
 *
 * __Rationale:__ Filled tonal buttons have a lighter background color and
 * darker label color, making them less visually prominent than a regular,
 * filled button. They’re still used for final or unblocking actions in a flow,
 * but do so with less emphasis.
 *
 * __Example usages:__
 * - Save
 * - Confirm
 * - Done
 *
 * @final
 * @suppress {visibility}
 */
export declare class MdTonalLinkButton extends TonalLinkButton {
    static styles: any[];
}