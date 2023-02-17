/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../field/outlined-field.js';
import './autocomplete-list.js';
import './autocomplete-surface.js';
import { ClassInfo } from 'lit/directives/class-map.js';
import { Autocomplete } from './lib/autocomplete.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-outlined-autocomplete': MdOutlinedAutocomplete;
    }
}
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
export declare class MdOutlinedAutocomplete extends Autocomplete {
    static styles: any[];
    protected readonly listTag: import("lit-html/static.js").StaticValue;
    protected readonly menuSurfaceTag: import("lit-html/static.js").StaticValue;
    protected readonly fieldTag: import("lit-html/static.js").StaticValue;
    /** @soyTemplate */
    protected getAutocompleteRenderClasses(): ClassInfo;
    /** @soyTemplate */
    protected getRenderClasses(): ClassInfo;
}