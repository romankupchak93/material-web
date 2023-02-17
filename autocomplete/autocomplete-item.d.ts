/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AutocompleteItem } from './lib/autocompleteitem/autocomplete-item.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-autocomplete-item': MdAutocompleteItem;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdAutocompleteItem extends AutocompleteItem {
    static styles: any[];
}