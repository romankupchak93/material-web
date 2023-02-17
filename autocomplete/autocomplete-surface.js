/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { styles } from '../menusurface/lib/menu-surface-styles.css.js';
import { AutocompleteSurface } from './lib/autocompletesurface/autocomplete-surface.js';
import { styles as autocompleteStyles } from './lib/autocompletesurface/autocomplete-surface-styles.css.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdAutocompleteSurface = class MdAutocompleteSurface extends AutocompleteSurface {
};
MdAutocompleteSurface.styles = [styles, autocompleteStyles];
MdAutocompleteSurface = __decorate([
    customElement('md-autocomplete-surface')
], MdAutocompleteSurface);
export { MdAutocompleteSurface };
//# sourceMappingURL=autocomplete-surface.js.map