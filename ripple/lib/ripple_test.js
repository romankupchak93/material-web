/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { Ripple } from './ripple.js';
var RippleStateClasses;
(function (RippleStateClasses) {
    RippleStateClasses["HOVERED"] = "hovered";
    RippleStateClasses["FOCUSED"] = "focused";
    RippleStateClasses["PRESSED"] = "pressed";
})(RippleStateClasses || (RippleStateClasses = {}));
let TestRipple = class TestRipple extends Ripple {
};
TestRipple = __decorate([
    customElement('test-ripple')
], TestRipple);
describe('ripple', () => {
    let element;
    let surface;
    let container;
    describe('basic', () => {
        beforeEach(async () => {
            container = document.createElement('div');
            document.body.appendChild(container);
            element = document.createElement('test-ripple');
            container.appendChild(element);
            await element.updateComplete;
            surface = element.renderRoot.querySelector('.surface');
        });
        afterEach(() => {
            document.body.removeChild(container);
        });
        it('initializes as an test-ripple', () => {
            expect(element).toBeInstanceOf(TestRipple);
        });
        it('sets pressed class on beginPress()', async () => {
            element.beginPress();
            await element.updateComplete;
            expect(surface).toHaveClass(RippleStateClasses.PRESSED);
        });
        it('removes pressed class on endPress()', async () => {
            element.beginPress();
            element.endPress();
            expect(surface).not.toHaveClass(RippleStateClasses.PRESSED);
        });
        it('sets focused class on beginFocus()', async () => {
            element.beginFocus();
            await element.updateComplete;
            expect(surface).toHaveClass(RippleStateClasses.FOCUSED);
        });
        it('removes focused class on endFocus()', async () => {
            element.beginFocus();
            element.endFocus();
            expect(surface).not.toHaveClass(RippleStateClasses.FOCUSED);
        });
        it('sets hover class on beginHover()', async () => {
            element.beginHover();
            await element.updateComplete;
            expect(surface).toHaveClass(RippleStateClasses.HOVERED);
        });
        it('removes hover class on endHover()', async () => {
            element.beginHover();
            await element.updateComplete;
            element.endHover();
            await element.updateComplete;
            expect(surface).not.toHaveClass(RippleStateClasses.HOVERED);
        });
        it('stops hovering when disabled', async () => {
            element.beginHover();
            await element.updateComplete;
            element.disabled = true;
            await element.updateComplete;
            expect(surface).not.toHaveClass(RippleStateClasses.HOVERED);
        });
    });
});
//# sourceMappingURL=ripple_test.js.map