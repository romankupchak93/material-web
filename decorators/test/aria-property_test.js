/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// import 'jasmine'; (google3-only)
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Environment } from '../../testing/environment.js';
import { ariaProperty } from '../aria-property.js';
describe('@ariaProperty', () => {
    const env = new Environment();
    let MyElement = class MyElement extends LitElement {
        render() {
            return html `<div class="root"
        aria-label=${ifDefined(this.ariaLabel)}></div>`;
        }
    };
    __decorate([
        property({ type: String, attribute: 'data-aria-label', noAccessor: true }),
        ariaProperty // tslint:disable-line:no-new-decorators
        ,
        __metadata("design:type", String)
    ], MyElement.prototype, "ariaLabel", void 0);
    __decorate([
        query('.root'),
        __metadata("design:type", HTMLElement)
    ], MyElement.prototype, "labelledElement", void 0);
    MyElement = __decorate([
        customElement('my-element')
    ], MyElement);
    let element;
    beforeEach(async () => {
        const root = env.render(html `<my-element></my-element>`);
        await env.waitForStability();
        element = root.querySelector('my-element');
    });
    it('should set `ariaX` from `data-*` attribute', () => {
        const value = 'Aria label';
        element.setAttribute('data-aria-label', value);
        expect(element.ariaLabel).toBe(value);
    });
    it('should set `data-*` attribute from `ariaX`', () => {
        const value = 'Aria label';
        element.ariaLabel = value;
        expect(element.getAttribute('data-aria-label')).toBe(value);
    });
    it('should remove `data-*` attribute when set to an empty string', async () => {
        element.ariaLabel = 'Aria label';
        element.ariaLabel = '';
        expect(element.hasAttribute('data-aria-label'))
            .withContext('should not have data-aria-label attribute')
            .toBeFalse();
    });
    it('should set `ariaX` from `aria-*` attribute', () => {
        const value = 'Aria label';
        element.setAttribute('aria-label', value);
        expect(element.ariaLabel).toBe(value);
    });
    it('should remove `aria-*` attribute when set and keep `ariaX` value', () => {
        const value = 'Aria label';
        element.setAttribute('aria-label', value);
        expect(element.hasAttribute('aria-label'))
            .withContext('should not have aria-label attribute')
            .toBeFalse();
        expect(element.ariaLabel).toBe(value);
    });
    it('should delegate to rendered elements after updateComplete', async () => {
        const value = 'Aria label';
        element.ariaLabel = value;
        await element.updateComplete;
        expect(element.labelledElement.getAttribute('aria-label')).toBe(value);
    });
    it('`ariaX` should coerce non-string values to strings', () => {
        element.ariaLabel = null;
        expect(element.ariaLabel).withContext('null should coerce to ""').toBe('');
        element.ariaLabel = undefined;
        expect(element.ariaLabel)
            .withContext('undefined should coerce to ""')
            .toBe('');
        element.ariaLabel = 42;
        expect(element.ariaLabel)
            .withContext('number should coerce to string')
            .toBe('42');
        element.ariaLabel = true;
        expect(element.ariaLabel)
            .withContext('boolean should coerce to string')
            .toBe('true');
    });
});
//# sourceMappingURL=aria-property_test.js.map