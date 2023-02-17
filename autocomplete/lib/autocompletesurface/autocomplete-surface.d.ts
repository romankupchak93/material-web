/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ClassInfo } from 'lit/directives/class-map.js';
import { MenuSurface } from '../../../menusurface/lib/menu-surface.js';
/** Base class for autocomplete surface component. */
export declare class AutocompleteSurface extends MenuSurface {
    stayOpenOnBodyClick: boolean;
    /** @soyTemplate */
    protected getRenderClasses(): ClassInfo;
}
