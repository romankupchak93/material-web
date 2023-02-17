/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, PropertyValues } from 'lit';
/**
 * A field component.
 */
export declare class Field extends LitElement {
    disabled: boolean;
    error: boolean;
    focused: boolean;
    label?: string;
    populated: boolean;
    required: boolean;
    /**
     * Whether or not the field has leading content.
     */
    hasStart: boolean;
    /**
     * Whether or not the field has trailing content.
     */
    hasEnd: boolean;
    private isAnimating;
    private readonly labelAnimationSignal;
    private readonly floatingLabelEl;
    private readonly restingLabelEl;
    protected update(props: PropertyValues<Field>): void;
    protected render(): import("lit-html").TemplateResult<1>;
    protected renderContainerContents(): import("lit-html").TemplateResult<1>;
    protected renderMiddleContents(): import("lit-html").TemplateResult<1>;
    protected renderFloatingLabel(): import("lit-html").TemplateResult<1>;
    protected renderRestingLabel(): import("lit-html").TemplateResult<1>;
    private renderLabel;
    private animateLabelIfNeeded;
    private getLabelKeyframes;
}
