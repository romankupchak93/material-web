/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { property } from 'lit/decorators.js';
import { ListItemEl } from '../../../list/lib/listitem/list-item.js';
import { CLOSE_REASON, DefaultCloseMenuEvent, isClosableKey } from '../shared.js';
/**
 * @fires close-menu {CloseMenuEvent}
 */
export class MenuItemEl extends ListItemEl {
    constructor() {
        super(...arguments);
        this.role = 'menuitem';
        /**
         * READONLY: self-identifies as a menu item and sets its identifying attribute
         */
        this.isMenuItem = true;
        /**
         * Keeps the menu open if clicked or keyboard selected.
         */
        this.keepOpen = false;
        /**
         * Used for overriding e.g. sub-menu-item.
         */
        this.keepOpenOnClick = false;
    }
    onClick() {
        if (this.keepOpen || this.keepOpenOnClick)
            return;
        this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.CLICK_SELECTION }));
    }
    onKeydown(e) {
        if (this.keepOpen)
            return;
        const keyCode = e.code;
        if (isClosableKey(keyCode)) {
            e.preventDefault();
            this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.KEYDOWN, key: keyCode }));
        }
    }
}
__decorate([
    property({ type: Boolean, attribute: 'md-menu-item', reflect: true }),
    __metadata("design:type", Object)
], MenuItemEl.prototype, "isMenuItem", void 0);
__decorate([
    property({ type: Boolean, attribute: 'keep-open' }),
    __metadata("design:type", Object)
], MenuItemEl.prototype, "keepOpen", void 0);
//# sourceMappingURL=menu-item.js.map