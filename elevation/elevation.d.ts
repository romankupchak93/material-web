/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Elevation } from './lib/elevation.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-elevation': MdElevation;
    }
}
/**
 * The `<md-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 */
export declare class MdElevation extends Elevation {
    static styles: any[];
}
