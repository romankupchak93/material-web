/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../action/selectable-action.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Chip } from './chip.js';
/** @soyCompatible */
export class SelectableChip extends Chip {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     */
    render() {
        return html `
      <span class="${classMap(this.getRootClasses())}" role="presentation">
        ${this.renderOverlay()}
        ${this.renderPrimaryAction()}
        ${this.renderDeleteAction()}
      </span>`;
    }
    /** @soyTemplate */
    getRootClasses() {
        return {
            ...super.getRootClasses(),
            'md3-chip--with-primary-graphic': true,
            'md3-chip--selectable': true,
            'md3-chip--selected': this.selected,
        };
    }
    /** @soyTemplate */
    renderPrimaryAction() {
        return html `
      <md-selectable-action
          ?disabled=${this.disabled}
          ?selected=${this.selected}
          ?isFocusable=${this.isFocusable}
          ?isTouchable=${this.isTouchable}
          .icon=${this.icon}
          .label=${this.label}
          .ariaLabel=${this.ariaLabel}>
      </md-selectable-action>`;
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], SelectableChip.prototype, "selected", void 0);
//# sourceMappingURL=selectable-chip.js.map