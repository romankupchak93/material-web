/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from './lib/filled-tonal-styles.css.js';
import { IconButton } from './lib/icon-button.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
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
let MdFilledTonalIconButton = class MdFilledTonalIconButton extends IconButton {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-icon-button--filled-tonal': true,
        };
    }
};
MdFilledTonalIconButton.styles = [sharedStyles, styles];
MdFilledTonalIconButton = __decorate([
    customElement('md-filled-tonal-icon-button')
], MdFilledTonalIconButton);
export { MdFilledTonalIconButton };
//# sourceMappingURL=filled-tonal-icon-button.js.map