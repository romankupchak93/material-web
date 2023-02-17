/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TemplateResult } from 'lit';
/**
 * Test environment setup for screenshot tests.
 */
export declare class Environment {
    /**
     * An array of root containers for rendering screenshot test elements.
     */
    private readonly roots;
    constructor();
    /**
     * This marks the enviroment to run without web animations. This is useful
     * when the tested code calls `.animate`.
     */
    withoutWebAnimations(): this;
    /**
     * Waits for stability on the page to prevent flaky-ness tests. Use this if
     * waiting for an API that uses `requestAnimationFrame()` or when waiting for
     * a Lit element to render.
     */
    waitForStability(): Promise<void>;
    /**
     * Waits for all Lit `ReactiveElement` children of the given parent node to
     * finish rendering.
     *
     * @param root a parent node to wait for rendering on.
     */
    private waitForLitRender;
    /**
     * Tests if an element is a Lit `ReactiveElement`.
     *
     * @param element the element to test.
     * @return true if the element is a `ReactiveElement`.
     */
    private isReactiveElement;
    /**
     * Render a Lit template in the environment's root container.
     *
     * @param template a Lit `TemplateResult` to render.
     * @return The root container the template was rendered to.
     */
    render(template: TemplateResult): HTMLDivElement;
    /**
     * Creates a new root container for screenshot rendering and adds it to the
     * body.
     *
     * Previous root containers will be hidden and displayed at the end of
     * testing for easier debugging.
     *
     * @return A new root container.
     */
    private createNewRoot;
    /**
     * Get the current root container.
     *
     * @return The current root container or undefined is nothing as been rendered
     *     yet.
     */
    protected getCurrentRoot(): HTMLElement | undefined;
}
