/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, PropertyValues } from 'lit';
/**
 * A ripple component.
 */
export declare class Ripple extends LitElement {
    /**
     * Sets the ripple to be an unbounded circle.
     */
    unbounded: boolean;
    /**
     * Disables the ripple.
     */
    disabled: boolean;
    private hovered;
    private focused;
    private pressed;
    private readonly mdRoot;
    private rippleSize;
    private rippleScale;
    private initialSize;
    private growAnimation?;
    private delayedEndPressHandle?;
    beginHover(hoverEvent?: Event): void;
    endHover(): void;
    beginFocus(): void;
    endFocus(): void;
    beginPress(positionEvent?: Event | null): void;
    endPress(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    protected update(changedProps: PropertyValues<this>): void;
    private getDimensions;
    private determineRippleSize;
    private getNormalizedPointerEventCoords;
    private getTranslationCoordinates;
    private startPressAnimation;
}
