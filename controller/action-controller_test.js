/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// import 'jasmine'; (google3-only)
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Environment } from '../testing/environment.js';
import { Harness } from '../testing/harness.js';
import { ActionController, TOUCH_DELAY_MS, WAIT_FOR_MOUSE_CLICK_MS } from './action-controller.js';
let MyActionElement = class MyActionElement extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.ignoreClicksWithModifiers = false;
        this.actionController = new ActionController(this);
    }
    beginPress(info) {
        this.lastBegin = info;
    }
    endPress(info) {
        this.lastEnd = info;
    }
    render() {
        return html `<div
      tabindex=-1
      @pointerdown=${this.handlePointerDown}
      @pointerup=${this.handlePointerUp}
      @pointercancel=${this.handlePointerCancel}
      @pointerleave=${this.handlePointerLeave}
      @click=${this.handleClick}
      @contextmenu=${this.handleContextMenu}
    ></div>`;
    }
    handlePointerDown(e) {
        this.actionController.pointerDown(e);
    }
    handlePointerUp(e) {
        this.actionController.pointerUp(e);
    }
    handlePointerCancel(e) {
        this.actionController.pointerCancel(e);
    }
    handlePointerLeave(e) {
        this.actionController.pointerLeave(e);
    }
    handleClick(e) {
        this.actionController.click(e);
    }
    handleContextMenu() {
        this.actionController.contextMenu();
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], MyActionElement.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], MyActionElement.prototype, "ignoreClicksWithModifiers", void 0);
MyActionElement = __decorate([
    customElement('my-action-element')
], MyActionElement);
class ActionControllerHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.renderRoot.querySelector('div');
    }
}
describe('ActionController', () => {
    const env = new Environment();
    let el;
    let harness;
    describe('mouse', () => {
        beforeEach(async () => {
            const root = env.render(html `<my-action-element></my-action-element>`);
            el = root.querySelector('my-action-element');
            harness = new ActionControllerHarness(el);
            await env.waitForStability();
        });
        it('calls beginPress on down', async () => {
            await harness.startClickWithMouse();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
        });
        it('calls endPress on up', async () => {
            await harness.clickWithMouse();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            expect(el.lastEnd).toBeDefined();
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('ignores presses from other mouse buttons', async () => {
            await harness.rightClickWithMouse();
            expect(el.lastBegin).not.toBeDefined();
            expect(el.lastEnd).not.toBeDefined();
        });
        it('goes through the expected phases during a press', async () => {
            await harness.startClickWithMouse();
            const ac = el.actionController;
            expect(ac.phase).toEqual('WAITING_FOR_MOUSE_CLICK');
            await harness.endClickWithMouse();
            expect(ac.phase).toEqual('INACTIVE');
        });
        it('cancels press if cursor leaves element during press', async () => {
            await harness.startClickWithMouse();
            await harness.endHover();
            expect(el.lastEnd).toEqual({ cancelled: true });
        });
        it('allows clicks with modifier keys by default', async () => {
            await harness.clickWithMouse({ altKey: true });
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('ignores clicks with modifier keys when `ignoreClicksWithModifiers` is set', async () => {
            el.ignoreClicksWithModifiers = true;
            await el.updateComplete;
            await harness.clickWithMouse({ altKey: true });
            expect(el.lastBegin).not.toBeDefined();
            expect(el.lastEnd).not.toBeDefined();
        });
        it('cancels when removed from dom', async () => {
            await harness.startClickWithMouse();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            el.remove();
            expect(el.lastEnd).toEqual({ cancelled: true });
        });
    });
    describe('keyboard', () => {
        beforeEach(async () => {
            const root = env.render(html `<my-action-element></my-action-element>`);
            el = root.querySelector('my-action-element');
            harness = new ActionControllerHarness(el);
            await env.waitForStability();
        });
        it('responds to keyboard clicks', async () => {
            await harness.clickWithKeyboard();
            expect(el.lastBegin).toEqual({ positionEvent: null });
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('responds to keyboard clicks with modifiers by default', async () => {
            await harness.clickWithKeyboard({ altKey: true });
            expect(el.lastBegin).toEqual({ positionEvent: null });
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('ignores keyboard clicks with modifiers when `ignoreClicksWithModifiers` is set', async () => {
            el.ignoreClicksWithModifiers = true;
            await el.updateComplete;
            await harness.clickWithKeyboard({ altKey: true });
            expect(el.lastBegin).not.toBeDefined();
            expect(el.lastEnd).not.toBeDefined();
        });
    });
    describe('touch', () => {
        beforeEach(async () => {
            const root = env.render(html `<my-action-element></my-action-element>`);
            el = root.querySelector('my-action-element');
            harness = new ActionControllerHarness(el);
            await env.waitForStability();
        });
        it('calls beginPress on down after hysteresis', async () => {
            await harness.startTap();
            jasmine.clock().tick(TOUCH_DELAY_MS);
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
        });
        it('calls endPress on up', async () => {
            await harness.tap();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            expect(el.lastEnd).toBeDefined();
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('goes through the expected phases during a long press', async () => {
            const ac = el.actionController;
            expect(ac.phase).toEqual('INACTIVE');
            await harness.startTap();
            expect(ac.phase).toEqual('TOUCH_DELAY');
            jasmine.clock().tick(TOUCH_DELAY_MS);
            expect(ac.phase).toEqual('HOLDING');
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            await harness.endTap();
            expect(ac.phase).toEqual('WAITING_FOR_MOUSE_CLICK');
            await harness.endTapClick();
            expect(ac.phase).toEqual('INACTIVE');
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('goes through the expected phases during a short press', async () => {
            const ac = el.actionController;
            expect(ac.phase).toEqual('INACTIVE');
            await harness.startTap();
            expect(ac.phase).toEqual('TOUCH_DELAY');
            expect(el.lastBegin).not.toBeDefined();
            await harness.endTap();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            expect(ac.phase).toEqual('WAITING_FOR_MOUSE_CLICK');
            await harness.endTapClick();
            expect(ac.phase).toEqual('INACTIVE');
            expect(el.lastEnd).toEqual({ cancelled: false });
        });
        it('cancels press if a held press is very long', async () => {
            await harness.startTap();
            await harness.endTap();
            expect(el.lastBegin).toBeDefined();
            expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
            jasmine.clock().tick(WAIT_FOR_MOUSE_CLICK_MS);
            expect(el.lastEnd).toEqual({ cancelled: true });
        });
        it('ignores non-primary touch gestures', async () => {
            await harness.tap({ isPrimary: false });
            expect(el.lastBegin).not.toBeDefined();
            expect(el.lastEnd).not.toBeDefined();
        });
        describe('contextmenu', () => {
            it('ignores the interaction if the context menu opens during a short press', async () => {
                await harness.startTap();
                await harness.startTapContextMenu();
                expect(el.lastBegin).not.toBeDefined();
                expect(el.lastEnd).not.toBeDefined();
            });
            it('cancels press if the context menu opens during a longer press', async () => {
                await harness.startTap();
                jasmine.clock().tick(TOUCH_DELAY_MS);
                await harness.startTapContextMenu();
                expect(el.lastBegin).toBeDefined();
                expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
                expect(el.lastEnd).toEqual({ cancelled: true });
            });
            it('ignores out of bounds downs after the contextmenu opens', async () => {
                await harness.startTap();
                await harness.startTapContextMenu();
                // set a _way out of bounds_ position, which would indicate pressing
                // on a different element
                await harness.startTap({ clientX: 9000, clientY: 9000 });
                jasmine.clock().tick(TOUCH_DELAY_MS);
                expect(el.lastBegin).not.toBeDefined();
            });
        });
        describe('cancel', () => {
            it('ignores the interaction if `pointercancel` happens during a short press', async () => {
                await harness.startTap();
                await harness.cancelTap();
                expect(el.lastBegin).not.toBeDefined();
                expect(el.lastEnd).not.toBeDefined();
            });
            it('cancels press if a `pointercancel` event fires during a longer press', async () => {
                await harness.startTap();
                jasmine.clock().tick(TOUCH_DELAY_MS);
                expect(el.lastBegin).toBeDefined();
                expect(el.lastBegin.positionEvent).toBeInstanceOf(PointerEvent);
                await harness.cancelTap();
                expect(el.lastEnd).toEqual({ cancelled: true });
            });
        });
    });
    describe('disabled', () => {
        let ac;
        beforeEach(async () => {
            const root = env.render(html `<my-action-element></my-action-element>`);
            el = root.querySelector('my-action-element');
            harness = new ActionControllerHarness(el);
            ac = el.actionController;
            await env.waitForStability();
        });
        it('controller mirrors disabled property of element', async () => {
            expect(ac.disabled).toEqual(false);
            el.disabled = true;
            expect(ac.disabled).toEqual(true);
        });
        it('cancels press when disabled', async () => {
            await harness.startClickWithMouse();
            expect(ac.pressed).toEqual(true);
            expect(el.lastBegin).toBeDefined();
            el.disabled = true;
            await el.updateComplete;
            expect(ac.pressed).toEqual(false);
            expect(el.lastEnd).toEqual({ cancelled: true });
        });
        it('does not register interactions when disabled', async () => {
            el.disabled = true;
            await el.updateComplete;
            await harness.clickWithMouse();
            expect(el.lastBegin).not.toBeDefined();
            expect(el.lastEnd).not.toBeDefined();
        });
    });
});
//# sourceMappingURL=action-controller_test.js.map