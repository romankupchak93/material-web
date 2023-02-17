/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ref } from 'lit/directives/ref.js';
import { isElementWithHarness } from './harness.js';
/**
 * Pre-defined test table template states commonly shared between components.
 */
export var State;
(function (State) {
    State["DEFAULT"] = "Default";
    State["DISABLED"] = "Disabled";
    State["ERROR"] = "Error";
    State["FOCUS"] = "Focus";
    State["HOVER"] = "Hover";
    State["PRESSED"] = "Pressed";
})(State || (State = {}));
/**
 * A template builder class that can be used to easily build test table template
 * render functions for multiple variants.
 *
 * If a harness is used, invoke `.withHarness()` before `.withVariants()` for
 * accurate types.
 *
 * @example
 *   const templates = new TemplateBuilder()
 *      .withHarness(MyHarness)
 *      .withVariants({
 *        filled(directive, props) {
 *          return html`
 *            <my-filled-element .label=${props.label} ${directive}>
 *              ${props.content}
 *            </my-filled-element>
 *          `;
 *        },
 *        outlined(directive, props) {
 *          return html`
 *            <my-outlined-element .label=${props.label} ${directive}>
 *              ${props.content}
 *            </my-outlined-element>
 *          `;
 *        },
 *      });
 *
 *   // Create an array of templates for every variant and provided property
 *   // object. This example creates both variants with and without a label.
 *   const testTemplates = templates.all({label: 'Foo'}, {});
 *
 *   // Create specific variant templates. Useful for when the properties are
 *   // not the same for each rendered variant.
 *   const variantTemplates = [
 *     templates.variant('filled', {label: 'Filled'}),
 *     templates.variant('filled', {label: ''}),
 *     templates.variant('outlined', {label: 'outlined'}, {}),
 *     templates.variant('outlined', {label: ''}, {}),
 *   ];
 *
 * @template H Optional element harness type.
 * @template V Variant name types.
 */
export class TemplateBuilder {
    constructor() {
        /**
         * A map of variant names and their template factories.
         */
        this.variants = new Map();
    }
    /**
     * Creates and return an array of test table templates that will render every
     * variant once for each test case element properties object provided.
     *
     * @param testCaseProps Element properties to render for every variant.
     * @return An array of test table templates for every variant and test case.
     */
    all(...testCaseProps) {
        if (!testCaseProps.length) {
            // Allow calling templates.all() and assume default props.
            testCaseProps.push({});
        }
        return Array.from(this.variants.values()).flatMap(({ display, factory }) => {
            return testCaseProps.map(props => ({ display, render: factory(props) }));
        });
    }
    /**
     * Creates and returns the test table template for a specific variant and
     * test case.
     *
     * @param variant The variant to render.
     * @param testCaseProps Element properties to render for this variant.
     * @return A test table template for the given variant and test case.
     */
    variant(variant, testCaseProps) {
        const displayAndRender = this.variants.get(variant);
        if (!displayAndRender) {
            throw new Error(`Missing variant '${variant}' in TemplateBuilder.`);
        }
        const { display, factory } = displayAndRender;
        const render = factory(testCaseProps);
        return { display, render };
    }
    /**
     * Sets the harness constructor to use for the template builder.
     *
     * @template NewHarness The new harness type.
     * @param harnessCtor The constructor for the harness.
     * @return The template builder, now using the provided harness type.
     */
    withHarness(harnessCtor) {
        const typedThis = this;
        typedThis.harnessCtor = harnessCtor;
        return typedThis;
    }
    /**
     * Sets the state callback to use for the template builder. It is invoked
     * after the template's element has rendered and provides the current state
     * and harness.
     *
     * This callback is typically used when additional behavior needs to be
     * simulated with the harness according to the current state.
     *
     * @example
     *   // Element-specific state that does not belong in the shared `State`
     *   // enum.
     *   enum MyState {
     *     FOCUS_MOUSE = 'Focus (Mouse)', // A unique state
     *   }
     *
     *   const templates = new TemplateBuilder()
     *       .withHarness(MyHarness)
     *       .withStateCallback(async (state, harness) => {
     *         // Use the harness to perform additional behavior not handled
     *         // by default.
     *         if (state === MyState.FOCUS_MOUSE) {
     *           await harness.focusWithMouse();
     *         }
     *       })
     *       .withVariants({/* ... *\/})
     *
     * @template NewHarness The new harness type.
     * @param callback The callback to be called.
     * @return The template builder, now using the provided harness type.
     */
    withStateCallback(callback) {
        this.stateCallback = callback;
        return this;
    }
    /**
     * Adds multiple variant render functions to the template builder.
     *
     * @param variants An object whose keys are variant names and values are
     *     either variant render functions or an object of variant options. The
     *     options specify a `display` name and the variant `render` function.
     * @return The template builder, now using the provided variants.
     */
    withVariants(variants) {
        // TODO: clean this up by only allowing TemplateVariantOptions and force
        // users to specify the display name.
        for (const variant of Object.keys(variants)) {
            this.withVariant(variant, variants[variant]);
        }
        return this;
    }
    /**
     * Adds a variant render function to the template builder.
     *
     * @param variant The new variant name to add.
     * @param renderOrOptions The variant's render function, or an object with the
     *     `render` function and a `display` name. The default display name is the
     *     `variant` name when a render function is provided instead.
     * @return The template builder, now using the provided variant.
     */
    withVariant(variant, renderOrOptions) {
        // TODO: clean this up by only allowing TemplateVariantOptions and force
        // users to specify the display name.
        const typedThis = this;
        const { display, render } = typeof renderOrOptions === 'function' ?
            { display: variant, render: renderOrOptions } :
            renderOrOptions;
        typedThis.variants.set(variant, {
            display: display ?? variant,
            factory: props => {
                return state => {
                    const directive = ref(async (element) => {
                        if (!element) {
                            return;
                        }
                        const harness = await this.createHarnessAndApplyState(element, state);
                        // Allow the component to apply additional state or perform custom
                        // state logic.
                        this.stateCallback?.(state, harness);
                    });
                    return render(directive, props || {}, state);
                };
            }
        });
        return typedThis;
    }
    /**
     * Creates a harness for the given element (if a harness constructor is
     * being used). This function will also apply default shared state, including
     * focusing, hovering, and pressing the element.
     *
     * @param element The element to create a harness for.
     * @param state The current state of the element.
     * @return The created harness, or undefined if a harness constructor is not
     *     being used.
     */
    async createHarnessAndApplyState(element, state) {
        if (!this.harnessCtor) {
            return undefined;
        }
        const harness = isElementWithHarness(element) ?
            element.harness :
            new this.harnessCtor(element);
        // Common shared component state harness actions
        await harness.reset();
        switch (state) {
            case State.FOCUS:
                await harness.focusWithKeyboard();
                break;
            case State.HOVER:
                await harness.startHover();
                break;
            case State.PRESSED:
                await harness.startClickWithMouse();
                break;
            default:
                break;
        }
        return harness;
    }
}
//# sourceMappingURL=templates.js.map