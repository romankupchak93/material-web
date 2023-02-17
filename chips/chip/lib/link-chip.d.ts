/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../action/link-action.js';
import { TemplateResult } from 'lit';
import { Chip } from './chip.js';
/** @soyCompatible */
export declare class LinkChip extends Chip {
    href: string;
    target: string;
    /**
     * @soyTemplate
     * @soyAttributes attributes: .md3-chip
     * @soyAttributes linkAttributes: .md3-chip__action
     */
    protected render(): TemplateResult;
    /** @soyTemplate */
    private renderPrimaryAction;
}
