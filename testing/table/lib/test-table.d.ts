/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { literal } from 'lit/static-html.js';
/** Test table interface. */
export interface TestTableTemplate<S extends string = string> {
    /** The row display name. May be a Lit static value for rich HTML. */
    display: string | ReturnType<typeof literal>;
    /**
     * A template's render function. It accepts a state string (the column) and
     * returns a Lit `TemplateResult`.
     *
     * @param state The current state to render in.
     * @return A `TemplateResult` for the given state.
     */
    render(state: S): TemplateResult | null;
}
/** @soyCompatible */
export declare class TestTable<S extends string = string> extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    title: string;
    states: S[];
    templates: Array<TestTableTemplate<S>>;
    dark: boolean;
    /** @soyTemplate */
    protected render(): TemplateResult;
    /** @soyTemplate */
    protected getRenderClasses(): ClassInfo;
    /** @soyTemplate */
    protected renderTemplates(): TemplateResult;
    /** Convert the name from camel case to sentence case. */
    private getVariantName;
}
