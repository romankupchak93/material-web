/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../field/filled-field.js';
import './autocomplete-list.js';
import './autocomplete-surface.js';
import { customElement } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
import { styles as filledForcedColorsStyles } from '../textfield/lib/filled-forced-colors-styles.css.js';
import { styles as filledStyles } from '../textfield/lib/filled-styles.css.js';
import { styles as sharedStyles } from '../textfield/lib/shared-styles.css.js';
import { Autocomplete } from './lib/autocomplete.js';
import { styles as autocompleteStyles } from './lib/filled-styles.css.js';
import { styles as sharedAutocompleteStyles } from './lib/shared-styles.css.js';
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdFilledAutocomplete = class MdFilledAutocomplete extends Autocomplete {
    constructor() {
        super(...arguments);
        this.listTag = literal `md-autocomplete-list`;
        this.menuSurfaceTag = literal `md-autocomplete-surface`;
        this.fieldTag = literal `md-filled-field`;
    }
    /** @soyTemplate */
    getAutocompleteRenderClasses() {
        return {
            ...super.getAutocompleteRenderClasses(),
            'md3-autocomplete--filled': true,
        };
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-text-field--filled': true,
        };
    }
};
MdFilledAutocomplete.styles = [
    sharedStyles, filledStyles, filledForcedColorsStyles,
    sharedAutocompleteStyles, autocompleteStyles
];
MdFilledAutocomplete = __decorate([
    customElement('md-filled-autocomplete')
], MdFilledAutocomplete);
export { MdFilledAutocomplete };
//# sourceMappingURL=filled-autocomplete.js.map