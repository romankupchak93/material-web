/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AutocompleteList } from './lib/autocompletelist/autocomplete-list.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-autocomplete-list': MdAutocompleteList;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdAutocompleteList extends AutocompleteList {
    static styles: any[];
}