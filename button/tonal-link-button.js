/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as sharedElevationStyles } from './lib/shared-elevation-styles.css.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
import { TonalLinkButton } from './lib/tonal-link-button.js';
import { styles as tonalStyles } from './lib/tonal-styles.css.js';
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
let MdTonalLinkButton = class MdTonalLinkButton extends TonalLinkButton {
};
MdTonalLinkButton.styles = [sharedStyles, sharedElevationStyles, tonalStyles];
MdTonalLinkButton = __decorate([
    customElement('md-tonal-link-button')
], MdTonalLinkButton);
export { MdTonalLinkButton };
//# sourceMappingURL=tonal-link-button.js.map