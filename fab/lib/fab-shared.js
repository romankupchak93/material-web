/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../elevation/elevation.js';
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { html, LitElement } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { pointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { ripple } from '../../ripple/directive.js';
/**
 * @soyCompatible
 */
export class FabShared extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.icon = '';
        this.label = '';
        this.lowered = false;
        this.reducedTouchTarget = false;
        this.showFocusRing = false;
        this.showRipple = false;
        this.renderRipple = () => {
            return html `<md-ripple class="md3-fab__ripple" ?disabled="${this.disabled}"></md-ripple>`;
        };
    }
    /**
     * @soyTemplate
     * @soyClasses fabClasses: .md3-fab
     */
    render() {
        const ariaLabel = this.label ? this.label : this.icon;
        const getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        return html `
      <button
        class="md3-fab md3-surface ${classMap(this.getRenderClasses())}"
        ?disabled="${this.disabled}"
        aria-label="${ariaLabel}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        ${ripple(getRipple)}>
        ${this.renderElevation()}
        ${this.renderFocusRing()}
        ${when(this.showRipple, this.renderRipple)}
        <span class="md3-fab__icon">
          <slot name="icon">${this.renderIcon(this.icon)}</slot>
        </span>
        ${this.renderLabel()}
        ${this.renderTouchTarget()}
      </button>`;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return { 'md3-fab--lowered': this.lowered };
    }
    /** @soyTemplate */
    renderTouchTarget() {
        return this.reducedTouchTarget ? html `` :
            html `<div class="md3-fab__touch"></div>`;
    }
    /** @soyTemplate */
    renderLabel() {
        return '';
    }
    /** @soyTemplate */
    renderElevation() {
        return html `<md-elevation shadow surface></md-elevation>`;
    }
    /** @soyTemplate */
    renderFocusRing() {
        return html `<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    handlePointerDown(e) {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
}
FabShared.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "disabled", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FabShared.prototype, "icon", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FabShared.prototype, "label", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "lowered", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "reducedTouchTarget", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], FabShared.prototype, "ripple", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FabShared.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FabShared.prototype, "showRipple", void 0);
//# sourceMappingURL=fab-shared.js.map