/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ClassInfo } from 'lit/directives/class-map.js';
import { List } from '../../../list/lib/list.js';
import { ARIARole } from '../../../types/aria.js';
/** Base class for autocomplete list component. */
export declare class AutocompleteList extends List {
    role: ARIARole;
    /** @soyTemplate */
    protected getListClasses(): ClassInfo;
}
