/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// import '@material/web/chips/action.js';
import '../../action/link-action.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Chip } from './chip.js';
/** @soyCompatible */
export class LinkChip extends Chip {
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     * @soyAttributes linkAttributes: .md3-chip__action
     */
    render() {
        return html `
      <span class="${classMap(this.getRootClasses())}" role="row">
        ${this.renderOverlay()}
        <span class="md3-chip__cell md3-chip__cell--primary" role="gridcell">
          ${this.renderPrimaryAction()}
        </span>
        ${this.renderDeleteAction()}
      </span>`;
    }
    /** @soyTemplate */
    renderPrimaryAction() {
        return html `
      <md-link-action
          ?disabled=${this.disabled}
          ?isFocusable=${this.isFocusable}
          ?isTouchable=${this.isTouchable}
          .icon=${this.icon}
          .label=${this.label}
          .ariaLabel=${this.ariaLabel}
          .href=${this.href}
          .target=${this.target}>
      </md-link-action>`;
    }
}
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], LinkChip.prototype, "href", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], LinkChip.prototype, "target", void 0);
//# sourceMappingURL=link-chip.js.map