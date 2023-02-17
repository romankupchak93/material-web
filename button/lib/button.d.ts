/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { LitElement, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { MdRipple } from '../../ripple/ripple.js';
import { ARIAHasPopup } from '../../types/aria.js';
import { ButtonState } from './state.js';
export declare abstract class Button extends LitElement implements ButtonState {
    static shadowRootOptions: ShadowRootInit;
    ariaHasPopup: ARIAHasPopup;
    ariaLabel: string;
    /**
     * Whether or not the button is disabled.
     */
    disabled: boolean;
    /**
     * Whether to render the icon at the inline end of the label rather than the
     * inline start.
     *
     * _Note:_ Link buttons cannot have trailing icons.
     */
    trailingIcon: boolean;
    /**
     * The button's visible label.
     */
    label: string;
    /**
     * Whether to display the icon or not.
     */
    hasIcon: boolean;
    /**
     * Whether `preventDefault()` should be called on the underlying button.
     * Useful for preventing certain native functionalities like preventing form
     * submissions.
     */
    preventClickDefault: boolean;
    protected buttonElement: HTMLElement;
    protected ripple: Promise<MdRipple | null>;
    protected showFocusRing: boolean;
    protected showRipple: boolean;
    protected assignedIcons: HTMLElement[];
    constructor();
    private readonly handleActivationClick;
    focus(): void;
    blur(): void;
    protected readonly getRipple: () => Promise<MdRipple>;
    protected render(): TemplateResult;
    protected getRenderClasses(): ClassInfo;
    protected renderTouchTarget(): TemplateResult;
    protected renderElevation(): TemplateResult;
    protected renderRipple: () => TemplateResult<1>;
    protected renderOutline(): TemplateResult;
    protected renderFocusRing(): TemplateResult;
    protected renderLabel(): TemplateResult;
    protected renderLeadingIcon(): TemplateResult | string;
    protected renderTrailingIcon(): TemplateResult | string;
    protected renderIcon(): TemplateResult;
    protected handlePointerDown(e: PointerEvent): void;
    protected handleClick(e: MouseEvent): void;
    protected handleFocus(): void;
    protected handleBlur(): void;
    protected handleSlotChange(): void;
}
