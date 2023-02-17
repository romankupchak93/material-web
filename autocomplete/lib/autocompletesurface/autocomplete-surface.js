/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MenuSurface } from '../../../menusurface/lib/menu-surface.js';
/** Base class for autocomplete surface component. */
export class AutocompleteSurface extends MenuSurface {
    constructor() {
        super(...arguments);
        this.stayOpenOnBodyClick = true;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-autocomplete-surface': true,
        };
    }
}
//# sourceMappingURL=autocomplete-surface.js.map