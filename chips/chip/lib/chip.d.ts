/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../../elevation/elevation.js';
import '../../action/delete-action.js';
import { TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { ActionElement } from '../../../actionelement/action-element.js';
/** Defines the border type of a chip. */
export declare enum BorderType {
    ELEVATED = "ELEVATED",
    HAIRLINE = "HAIRLINE"
}
/** Defines the shape of the vertical edge of a chip. */
export declare enum EdgeType {
    ROUNDED = "ROUNDED",
    STRAIGHT = "STRAIGHT"
}
/** @soyCompatible */
export declare abstract class Chip extends ActionElement {
    isFocusable: boolean;
    isTouchable: boolean;
    disabled: boolean;
    hasAvatar: boolean;
    hasDeleteAction: boolean;
    icon: string;
    label: string;
    borderType: BorderType;
    edgeType: EdgeType;
    addedAnnouncement: string;
    removedAnnouncement: string;
    closeActionAriaLabel: string;
    /** @soyPrefixAttribute */
    ariaLabel: string;
    /** @soyTemplate */
    protected getRootClasses(): ClassInfo;
    /** @soyTemplate */
    protected renderOverlay(): TemplateResult;
    /** @soyTemplate */
    protected renderDeleteAction(): TemplateResult;
}
