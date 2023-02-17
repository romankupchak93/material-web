/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// import 'jasmine'; (google3-only)
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Environment } from '../testing/environment.js';
import { ActionElement } from './action-element.js';
let TestActionElement = class TestActionElement extends ActionElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], TestActionElement.prototype, "disabled", void 0);
TestActionElement = __decorate([
    customElement('test-action-element')
], TestActionElement);
describe('Action Element', () => {
    const env = new Environment();
    let el;
    let actionEvent = null;
    beforeEach(async () => {
        actionEvent = null;
        const root = env.render(html `<test-action-element></test-action-element>`);
        el = root.querySelector('test-action-element');
        el.addEventListener('action', (ev) => {
            actionEvent = ev;
        });
        await env.waitForStability();
    });
    it('fires action event from endPress', () => {
        el.endPress({ cancelled: false });
        expect(actionEvent).toBeInstanceOf(CustomEvent);
        expect(actionEvent.detail).toBeNull();
    });
    it('fires action event with actionData', () => {
        const data = {
            test: true,
        };
        el.endPress({ cancelled: false, actionData: data });
        expect(actionEvent).toBeInstanceOf(CustomEvent);
        expect(actionEvent.detail).toEqual(data);
    });
    describe('cancelled', () => {
        it('does not fire action event from endPress', () => {
            el.endPress({ cancelled: true });
            expect(actionEvent).toBeNull();
        });
        it('does not fire action event with actionData', () => {
            const data = {
                test: true,
            };
            el.endPress({ cancelled: true, actionData: data });
            expect(actionEvent).toBeNull();
        });
    });
});
//# sourceMappingURL=action-element_test.js.map