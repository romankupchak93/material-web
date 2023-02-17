/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Field } from './field.js';
/**
 * A filled field component.
 */
export class FilledField extends Field {
    constructor() {
        super();
        this.strokeTransformOrigin = '';
        this.handleClick = (event) => {
            if (this.disabled) {
                return;
            }
            this.updateStrokeTransformOrigin(event);
        };
        this.addEventListener('click', this.handleClick);
    }
    update(props) {
        // Upon losing focus, the stroke resets to expanding from the center, such
        // as when re-focusing with a keyboard.
        const unfocusing = props.has('focused') && !this.focused;
        if (unfocusing) {
            this.updateStrokeTransformOrigin();
        }
        super.update(props);
    }
    renderContainerContents() {
        const strokeStyle = { transformOrigin: this.strokeTransformOrigin };
        return html `
      <span class="state-layer"></span>
      ${super.renderContainerContents()}
      <span class="active-indicator"
        style="${styleMap(strokeStyle)}"></span>
    `;
    }
    renderMiddleContents() {
        return html `
      ${this.renderFloatingLabel()}
      ${this.renderRestingLabel()}
      ${super.renderMiddleContents()}
    `;
    }
    updateStrokeTransformOrigin(event) {
        let transformOrigin = '';
        if (event) {
            // Can't use instanceof TouchEvent since Firefox does not provide the
            // constructor globally.
            const isTouchEvent = 'touches' in event;
            const eventX = isTouchEvent ? event.touches[0].clientX : event.clientX;
            const rootRect = this.getBoundingClientRect();
            transformOrigin = `${eventX - rootRect.x}px`;
        }
        this.strokeTransformOrigin = transformOrigin;
    }
}
__decorate([
    state(),
    __metadata("design:type", Object)
], FilledField.prototype, "strokeTransformOrigin", void 0);
//# sourceMappingURL=filled-field.js.map