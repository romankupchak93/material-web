/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from '../list/lib/listitem/list-item-styles.css.js';
import { AutocompleteItem } from './lib/autocompleteitem/autocomplete-item.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdAutocompleteItem = class MdAutocompleteItem extends AutocompleteItem {
};
MdAutocompleteItem.styles = [styles];
MdAutocompleteItem = __decorate([
    customElement('md-autocomplete-item')
], MdAutocompleteItem);
export { MdAutocompleteItem };
//# sourceMappingURL=autocomplete-item.js.map