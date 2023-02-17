/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class ListItemAvatar extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The image `src` for the avatar
         */
        this.avatar = '';
        /**
         * The image `alt`.
         */
        this.altText = '';
        /**
         * The image `loading` attribute.
         */
        this.loading = 'eager';
    }
    render() {
        return html `
       <img
          src="${this.avatar}"
          alt="${this.altText || nothing}"
          loading="${this.loading}"
        class="md3-list-item__avatar" />
     `;
    }
}
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemAvatar.prototype, "avatar", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemAvatar.prototype, "altText", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ListItemAvatar.prototype, "loading", void 0);
//# sourceMappingURL=list-item-avatar.js.map