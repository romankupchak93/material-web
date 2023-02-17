/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { NavigationDrawerModal } from './lib/navigation-drawer-modal.js';
import { styles } from './lib/navigation-drawer-modal-styles.css.js';
import { styles as sharedStyles } from './lib/shared-styles.css.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdNavigationDrawerModal = class MdNavigationDrawerModal extends NavigationDrawerModal {
};
MdNavigationDrawerModal.styles = [sharedStyles, styles];
MdNavigationDrawerModal = __decorate([
    customElement('md-navigation-drawer-modal')
], MdNavigationDrawerModal);
export { MdNavigationDrawerModal };
//# sourceMappingURL=navigation-drawer-modal.js.map