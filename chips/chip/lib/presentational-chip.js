/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../action/presentational-action.js';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { Chip } from './chip.js';
/** @soyCompatible */
export class PresentationalChip extends Chip {
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
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
      <md-presentational-action
          ?disabled=${this.disabled}
          ?isFocusable=${this.isFocusable}
          ?isTouchable=${this.isTouchable}
          .icon=${this.icon}
          .label=${this.label}
          .ariaLabel=${this.ariaLabel}>
      </md-presentational-action>`;
    }
}
//# sourceMappingURL=presentational-chip.js.map