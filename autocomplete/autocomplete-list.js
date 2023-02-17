/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from '../list/lib/list-styles.css.js';
import { AutocompleteList } from './lib/autocompletelist/autocomplete-list.js';
import { styles as autocompleteStyles } from './lib/autocompletelist/autocomplete-list-styles.css.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdAutocompleteList = class MdAutocompleteList extends AutocompleteList {
};
MdAutocompleteList.styles = [styles, autocompleteStyles];
MdAutocompleteList = __decorate([
    customElement('md-autocomplete-list')
], MdAutocompleteList);
export { MdAutocompleteList };
//# sourceMappingURL=autocomplete-list.js.map