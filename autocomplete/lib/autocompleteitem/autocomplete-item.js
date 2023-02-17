/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemEl } from '../../../list/lib/listitem/list-item.js';
/** Base class for autocomplete item component. */
export class AutocompleteItem extends ListItemEl {
    constructor() {
        super(...arguments);
        this.role = 'option';
    }
}
//# sourceMappingURL=autocomplete-item.js.map