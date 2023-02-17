/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
import { TextLinkButton } from './lib/text-link-button.js';
import { styles as textStyles } from './lib/text-styles.css.js';
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
let MdTextLinkButton = class MdTextLinkButton extends TextLinkButton {
};
MdTextLinkButton.styles = [sharedStyles, textStyles];
MdTextLinkButton = __decorate([
    customElement('md-text-link-button')
], MdTextLinkButton);
export { MdTextLinkButton };
//# sourceMappingURL=text-link-button.js.map