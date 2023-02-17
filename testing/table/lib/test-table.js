/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { LitElement, render } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { guard } from 'lit/directives/guard.js';
import { html } from 'lit/static-html.js';
/** @soyCompatible */
export class TestTable extends LitElement {
    constructor() {
        super(...arguments);
        this.title = 'Title';
        this.states = [];
        this.templates = [];
        this.dark = false;
    }
    /** @soyTemplate */
    render() {
        return html `
      <table class="md3-test-table ${classMap(this.getRenderClasses())}">
        <thead>
          <tr>
            <th class="md3-test-table__header"></th>
            ${this.states.map(state => html `
              <th class="md3-test-table__header">${state}</th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${guard([this.templates, this.states], () => this.renderTemplates())}
        </tbody>
        <caption class="md3-test-table__header">${this.title}</caption>
      </table>
    `;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            'md3-test-table--dark': this.dark,
        };
    }
    /** @soyTemplate */
    renderTemplates() {
        // Render templates in the light DOM for easier styling access
        render(this.templates.map((template, rowIndex) => this.states.map((state, colIndex) => {
            const renderResult = template.render(state);
            const isEmptyTemplate = renderResult === null;
            return isEmptyTemplate ? html `` : html `
                <div slot="${`${rowIndex}-${colIndex}`}">
                  ${renderResult}
                </div>`;
        })), this);
        return html `
      ${this.templates.map((template, rowIndex) => html `
        <tr>
          <th class="md3-test-table__header">
            ${this.getVariantName(template.display)}
          </th>
          ${this.states.map((state, colIndex) => html `
            <td class="md3-test-table__cell">
              <slot name="${`${rowIndex}-${colIndex}`}">
                <div class="md3-test-table__text">N/A</div>
              </slot>
            </td>
          `)}
        </tr>
      `)}
    `;
    }
    /** Convert the name from camel case to sentence case. */
    getVariantName(display) {
        if (typeof display !== 'string') {
            return display;
        }
        const withSpaces = display.replace(/([A-Z])/g, ' $1');
        return withSpaces[0].toUpperCase() + withSpaces.slice(1);
    }
}
TestTable.shadowRootOptions = { mode: 'open' };
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TestTable.prototype, "title", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], TestTable.prototype, "states", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], TestTable.prototype, "templates", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], TestTable.prototype, "dark", void 0);
//# sourceMappingURL=test-table.js.map