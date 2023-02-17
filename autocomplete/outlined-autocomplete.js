/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../field/outlined-field.js';
import './autocomplete-list.js';
import './autocomplete-surface.js';
import { customElement } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
import { styles as outlinedForcedColorsStyles } from '../textfield/lib/outlined-forced-colors-styles.css.js';
import { styles as outlinedStyles } from '../textfield/lib/outlined-styles.css.js';
import { styles as sharedStyles } from '../textfield/lib/shared-styles.css.js';
import { Autocomplete } from './lib/autocomplete.js';
import { styles as autocompleteStyles } from './lib/outlined-styles.css.js';
import { styles as sharedAutocompleteStyles } from './lib/shared-styles.css.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdOutlinedAutocomplete = class MdOutlinedAutocomplete extends Autocomplete {
    constructor() {
        super(...arguments);
        this.listTag = literal `md-autocomplete-list`;
        this.menuSurfaceTag = literal `md-autocomplete-surface`;
        this.fieldTag = literal `md-outlined-field`;
    }
    /** @soyTemplate */
    getAutocompleteRenderClasses() {
        return {
            ...super.getAutocompleteRenderClasses(),
            'md3-autocomplete--outlined': true,
        };
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-text-field--outlined': true,
        };
    }
};
MdOutlinedAutocomplete.styles = [
    sharedStyles, outlinedStyles, outlinedForcedColorsStyles,
    sharedAutocompleteStyles, autocompleteStyles
];
MdOutlinedAutocomplete = __decorate([
    customElement('md-outlined-autocomplete')
], MdOutlinedAutocomplete);
export { MdOutlinedAutocomplete };
//# sourceMappingURL=outlined-autocomplete.js.map