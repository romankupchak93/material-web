/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AutocompleteSurface } from './lib/autocompletesurface/autocomplete-surface.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-autocomplete-surface': MdAutocompleteSurface;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdAutocompleteSurface extends AutocompleteSurface {
    static styles: any[];
}
