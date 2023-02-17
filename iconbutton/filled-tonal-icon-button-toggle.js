/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from './lib/filled-tonal-styles.css.js';
import { IconButtonToggle } from './lib/icon-button-toggle.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
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
let MdFilledTonalIconButtonToggle = class MdFilledTonalIconButtonToggle extends IconButtonToggle {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-icon-button--filled-tonal': true,
            'md3-icon-button--toggle-filled-tonal': true,
        };
    }
};
MdFilledTonalIconButtonToggle.styles = [sharedStyles, styles];
MdFilledTonalIconButtonToggle = __decorate([
    customElement('md-filled-tonal-icon-button-toggle')
], MdFilledTonalIconButtonToggle);
export { MdFilledTonalIconButtonToggle };
//# sourceMappingURL=filled-tonal-icon-button-toggle.js.map