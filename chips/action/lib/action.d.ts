/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../../focus/focus-ring.js';
import '../../../ripple/ripple.js';
import { TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { ActionElement, BeginPressConfig, EndPressConfig } from '../../../actionelement/action-element.js';
import { MdRipple } from '../../../ripple/ripple.js';
/**
 * Base class for all actions.
 * @soyCompatible
 */
export declare abstract class Action extends ActionElement {
    isDeletable: boolean;
    isFocusable: boolean;
    isTouchable: boolean;
    disabled: boolean;
    showFocusRing: boolean;
    ripple?: MdRipple | null;
    /** @soyPrefixAttribute */
    ariaLabel: string;
    /** @soyTemplate */
    protected getRootClasses(): ClassInfo;
    /** @soyTemplate */
    protected getRippleClasses(): ClassInfo;
    /** @soyTemplate */
    protected renderTouchTarget(): TemplateResult;
    /** @soyTemplate */
    protected renderRipple(): TemplateResult;
    /** @soyTemplate */
    protected renderFocusRing(): TemplateResult;
    protected handleFocus(): void;
    protected handleBlur(): void;
    beginPress({ positionEvent }: BeginPressConfig): void;
    endPress(options: EndPressConfig): void;
    protected handlePointerEnter(e: PointerEvent): void;
    handlePointerLeave(e: PointerEvent): void;
    handlePointerDown(e: PointerEvent): void;
    handleClick(e: MouseEvent): void;
    protected handleKeyDown(e: KeyboardEvent): void;
    protected getInteractionEvent(): string;
    private dispatchCustomEvent;
    private isRTL;
}