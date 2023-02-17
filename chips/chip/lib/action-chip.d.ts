/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../action/primary-action.js';
import { TemplateResult } from 'lit';
import { Chip } from './chip.js';
/** @soyCompatible */
export declare class ActionChip extends Chip {
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     */
    protected render(): TemplateResult;
    /** @soyTemplate */
    private renderPrimaryAction;
}
