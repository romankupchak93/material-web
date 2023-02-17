/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { Action } from './action.js';
/** @soyCompatible */
export declare class DeleteAction extends Action {
    /** @soyTemplate */
    protected render(): TemplateResult;
    /** @soyTemplate */
    protected getRootClasses(): ClassInfo;
    /** @soyTemplate */
    protected getRippleClasses(): ClassInfo;
    /** @soyTemplate */
    private renderDeleteIcon;
    getInteractionEvent(): string;
}