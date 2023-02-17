/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { FilledLinkButton } from './lib/filled-link-button.js';
import { styles as filledStyles } from './lib/filled-styles.css.js';
import { styles as sharedElevationStyles } from './lib/shared-elevation-styles.css.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment. This is a linkable variant.
 *
 * @description
 * __Emphasis:__ High emphasis – For the primary, most important, or most common
 * action on a screen
 *
 * __Rationale:__ The filled button’s contrasting surface color makes it the
 * most prominent button after the FAB. It’s used for final or unblocking
 * actions in a flow.
 *
 * __Example usages:__
 * - Save
 * - Confirm
 * - Done
 *
 * @final
 * @suppress {visibility}
 */
let MdFilledLinkButton = class MdFilledLinkButton extends FilledLinkButton {
};
MdFilledLinkButton.styles = [sharedStyles, sharedElevationStyles, filledStyles];
MdFilledLinkButton = __decorate([
    customElement('md-filled-link-button')
], MdFilledLinkButton);
export { MdFilledLinkButton };
//# sourceMappingURL=filled-link-button.js.map