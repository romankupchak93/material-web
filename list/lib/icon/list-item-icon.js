/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { html, LitElement } from 'lit';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class ListItemIcon extends LitElement {
    render() {
        return html `
      <span class="md3-list-item__icon"><slot></slot></span>
    `;
    }
}
//# sourceMappingURL=list-item-icon.js.map