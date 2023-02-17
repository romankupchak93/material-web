/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues } from 'lit';
import { Field } from './field.js';
/**
 * A filled field component.
 */
export declare class FilledField extends Field {
    private strokeTransformOrigin;
    constructor();
    protected update(props: PropertyValues<FilledField>): void;
    protected renderContainerContents(): import("lit-html").TemplateResult<1>;
    protected renderMiddleContents(): import("lit-html").TemplateResult<1>;
    private readonly handleClick;
    private updateStrokeTransformOrigin;
}
