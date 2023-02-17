/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../action/selectable-action.js';
import { TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { Chip } from './chip.js';
/** @soyCompatible */
export declare class SelectableChip extends Chip {
    selected: boolean;
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     */
    protected render(): TemplateResult;
    /** @soyTemplate */
    protected getRootClasses(): ClassInfo;
    /** @soyTemplate */
    private renderPrimaryAction;
}
