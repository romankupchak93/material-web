/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Elevation } from './lib/elevation.js';
import { styles } from './lib/elevation-styles.css.js';
/**
 * The `<md-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 */
let MdElevation = class MdElevation extends Elevation {
};
MdElevation.styles = [styles];
MdElevation = __decorate([
    customElement('md-elevation')
], MdElevation);
export { MdElevation };
//# sourceMappingURL=elevation.js.map