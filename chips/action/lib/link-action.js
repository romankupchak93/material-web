/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { PrimaryAction } from './primary-action.js';
/** @soyCompatible */
export class LinkAction extends PrimaryAction {
    /**
     * @soyTemplate
     * @soyAttributes linkAttributes: .md3-chip__action
     */
    render() {
        return html `
      <span class="action-link">
        <a class="${classMap(this.getRootClasses())}"
            aria-label="${ifDefined(this.ariaLabel)}"
            href="${ifDefined(this.href)}"
            target="${ifDefined(this.target)}"
            tabindex="${this.isFocusable ? 0 : -1}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            @pointerenter="${this.handlePointerEnter}"
            @pointerleave="${this.handlePointerLeave}"
            @pointerdown="${this.handlePointerDown}"
            @pointerup="${this.handlePointerUp}"
            @pointercancel="${this.handlePointerCancel}"
            @contextmenu="${this.handleContextMenu}">
          ${this.renderTouchTarget()}
          ${this.renderRipple()}
          ${this.renderFocusRing()}
          ${this.renderGraphic()}
          ${this.renderLabel()}
        </a>
      </span>`;
    }
    endPress(options) {
        super.endPress(options);
        this.ripple?.endPress();
    }
}
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], LinkAction.prototype, "href", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], LinkAction.prototype, "target", void 0);
//# sourceMappingURL=link-action.js.map