/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../elevation/elevation.js';
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { LitElement, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
/**
 * @soyCompatible
 */
export declare abstract class FabShared extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    disabled: boolean;
    icon: string;
    label: string;
    lowered: boolean;
    reducedTouchTarget: boolean;
    private readonly ripple;
    private showFocusRing;
    private showRipple;
    /**
     * @soyTemplate
     * @soyClasses fabClasses: .md3-fab
     */
    protected render(): TemplateResult;
    /** @soyTemplate */
    protected getRenderClasses(): ClassInfo;
    /** @soyTemplate */
    protected abstract renderIcon(icon: string): TemplateResult | string;
    /** @soyTemplate */
    protected renderTouchTarget(): TemplateResult;
    /** @soyTemplate */
    protected renderLabel(): TemplateResult | string;
    /** @soyTemplate */
    protected renderElevation(): TemplateResult;
    /** @soyTemplate */
    protected renderFocusRing(): TemplateResult;
    private handlePointerDown;
    private handleFocus;
    private handleBlur;
    private readonly renderRipple;
}
