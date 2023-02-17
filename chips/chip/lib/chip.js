/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../../elevation/elevation.js';
import '../../action/delete-action.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ActionElement } from '../../../actionelement/action-element.js';
import { ariaProperty } from '../../../decorators/aria-property.js';
/** Defines the border type of a chip. */
export var BorderType;
(function (BorderType) {
    BorderType["ELEVATED"] = "ELEVATED";
    BorderType["HAIRLINE"] = "HAIRLINE";
})(BorderType || (BorderType = {}));
/** Defines the shape of the vertical edge of a chip. */
export var EdgeType;
(function (EdgeType) {
    EdgeType["ROUNDED"] = "ROUNDED";
    EdgeType["STRAIGHT"] = "STRAIGHT";
})(EdgeType || (EdgeType = {}));
/** @soyCompatible */
export class Chip extends ActionElement {
    constructor() {
        super(...arguments);
        this.isFocusable = false;
        this.isTouchable = false;
        this.disabled = false;
        this.hasAvatar = false;
        this.hasDeleteAction = false;
        this.icon = '';
        this.label = '';
        this.borderType = BorderType.HAIRLINE;
        this.edgeType = EdgeType.ROUNDED;
        this.addedAnnouncement = '';
        this.removedAnnouncement = '';
        this.closeActionAriaLabel = '';
    }
    /** @soyTemplate */
    getRootClasses() {
        const hasIcon = this.icon.trim().length > 0;
        return {
            'md3-chip': true,
            'md3-chip--disabled': this.disabled,
            'md3-chip--touch': this.isTouchable,
            'md3-chip--with-primary-graphic': hasIcon,
            'md3-chip--with-primary-icon': hasIcon,
            'md3-chip--with-avatar': this.hasAvatar,
            'md3-chip--with-delete-action': this.hasDeleteAction,
        };
    }
    /** @soyTemplate */
    renderOverlay() {
        return this.borderType === BorderType.ELEVATED ?
            html `<md-elevation aria-hidden="true" shadow surface></md-elevation>` :
            html ``;
    }
    /** @soyTemplate */
    renderDeleteAction() {
        if (!this.hasDeleteAction) {
            return html ``;
        }
        else {
            return html `
        <span class="md3-chip__cell md3-chip__cell--delete"
              role="gridcell">
          <md-delete-action
            ?disabled=${this.disabled}
            ?isFocusable=${this.isFocusable}
            ?isTouchable=${this.isTouchable}
            .ariaLabel=${this.closeActionAriaLabel}>
          </md-delete-action>
        </span>`;
        }
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Chip.prototype, "isFocusable", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Chip.prototype, "isTouchable", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Chip.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Chip.prototype, "hasAvatar", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Chip.prototype, "hasDeleteAction", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "icon", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "borderType", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "edgeType", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "addedAnnouncement", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "removedAnnouncement", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "closeActionAriaLabel", void 0);
__decorate([
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    property({ type: String, attribute: 'aria-label' }),
    __metadata("design:type", String)
], Chip.prototype, "ariaLabel", void 0);
//# sourceMappingURL=chip.js.map