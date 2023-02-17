/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../action/presentational-action.js';
import { TemplateResult } from 'lit';
import { Chip } from './chip.js';
/** @soyCompatible */
export declare class PresentationalChip extends Chip {
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     */
    protected render(): TemplateResult;
    /** @soyTemplate */
    private renderPrimaryAction;
}