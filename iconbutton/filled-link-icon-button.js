/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from './lib/filled-styles.css.js';
import { LinkIconButton } from './lib/link-icon-button.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
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
let MdFilledLinkIconButton = class MdFilledLinkIconButton extends LinkIconButton {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-icon-button--filled': true,
        };
    }
};
MdFilledLinkIconButton.styles = [sharedStyles, styles];
MdFilledLinkIconButton = __decorate([
    customElement('md-filled-link-icon-button')
], MdFilledLinkIconButton);
export { MdFilledLinkIconButton };
//# sourceMappingURL=filled-link-icon-button.js.map