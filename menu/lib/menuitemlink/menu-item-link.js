/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { property } from 'lit/decorators.js';
import { ListItemLink } from '../../../list/lib/listitemlink/list-item-link.js';
import { CLOSE_REASON, DefaultCloseMenuEvent, isClosableKey, SELECTION_KEY } from '../shared.js';
/**
 * @fires close-menu {CloseMenuEvent}
 */
export class MenuItemLink extends ListItemLink {
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
        // Do not preventDefault on enter or else it will prevent from opening links
        if (isClosableKey(keyCode) && keyCode !== SELECTION_KEY.ENTER) {
            e.preventDefault();
            this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.KEYDOWN, key: keyCode }));
        }
    }
}
__decorate([
    property({ type: Boolean, attribute: 'md-menu-item', reflect: true }),
    __metadata("design:type", Object)
], MenuItemLink.prototype, "isMenuItem", void 0);
__decorate([
    property({ type: Boolean, attribute: 'keep-open' }),
    __metadata("design:type", Object)
], MenuItemLink.prototype, "keepOpen", void 0);
//# sourceMappingURL=menu-item-link.js.map