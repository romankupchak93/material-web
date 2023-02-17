/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../elevation/elevation.js';
import { html } from 'lit';
import { Button } from './button.js';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class ElevatedButton extends Button {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-button--elevated': true,
        };
    }
    renderElevation() {
        return html `<md-elevation shadow surface></md-elevation>`;
    }
}
//# sourceMappingURL=elevated-button.js.map