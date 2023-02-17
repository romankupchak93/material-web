/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { List } from '../../../list/lib/list.js';
/** Base class for autocomplete list component. */
export class AutocompleteList extends List {
    constructor() {
        super(...arguments);
        this.role = 'listbox';
    }
    /** @soyTemplate */
    getListClasses() {
        return {
            ...super.getListClasses(),
            'md3-autocomplete-list': true,
        };
    }
}
//# sourceMappingURL=autocomplete-list.js.map