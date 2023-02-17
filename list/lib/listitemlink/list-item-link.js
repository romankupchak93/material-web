/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ripple } from '../../../ripple/directive.js';
import { ListItemEl } from '../listitem/list-item.js';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class ListItemLink extends ListItemEl {
    renderListItem(content) {
        return html `
      <a
          tabindex=${this.disabled ? -1 : this.itemTabIndex}
          role=${this.role}
          aria-selected=${this.ariaSelected || nothing}
          aria-checked=${this.ariaChecked || nothing}
          class="list-item ${classMap(this.getRenderClasses())}"
          href=${this.href}
          target=${this.target || nothing}
          @pointerdown=${this.onPointerdown}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @click=${this.onClick}
          @pointerenter=${this.onPointerenter}
          @pointerleave=${this.onPointerleave}
          @keydown=${this.onKeydown}
          ${ripple(this.getRipple)}>${content}</a>`;
    }
}
__decorate([
    property(),
    __metadata("design:type", String)
], ListItemLink.prototype, "href", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ListItemLink.prototype, "target", void 0);
//# sourceMappingURL=list-item-link.js.map