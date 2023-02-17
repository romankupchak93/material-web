/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Harness} from '../testing/harness.js';

import {Slider} from './lib/slider.js';

/**
 * Test harness for slider.
 */
export class SliderHarness extends Harness<Slider> {
  override async getInteractiveElement() {
    await this.element.updateComplete;
    // Test access to protected property
    // tslint:disable-next-line:no-dict-access-on-struct-type
    return this.element['inputB'];
  }

  getInputs() {
    //  Test access to protected property
    // tslint:disable-next-line:no-dict-access-on-struct-type
    return [this.element['inputB'], this.element['inputA']];
  }
  getHandles() {
    //  Test access to protected property
    // tslint:disable-next-line:no-dict-access-on-struct-type
    return [this.element['handleB'], this.element['handleA']];
  }

  getLabels() {
    return Array.from(this.element.renderRoot.querySelectorAll('.label'));
  }

  isLabelShowing() {
    const labels = this.getLabels();
    return labels.some(l => {
      // remove transition to avoid the need to wait for it.
      (l as HTMLElement).style.setProperty('transition', 'none');
      const {width} = l.getBoundingClientRect();
      (l as HTMLElement).style.removeProperty('transition');
      return width > 0;
    });
  }

  async simulateValueInteraction(value: number, el?: HTMLInputElement) {
    if (!el) {
      el = (this.getInputs())[0];
    }
    el.focus();
    el.value = String(value);
    el.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
    el.dispatchEvent(new Event('change', {bubbles: true}));
    await this.element.updateComplete;
  }

  private positionEventAtHandle(init: PointerEventInit, startHandle = false) {
    const handle = this.getHandles()[startHandle ? 1 : 0];
    const {x, y} = handle.getBoundingClientRect();
    return {...init, clientX: x, clientY: y, screenX: x, screenY: y};
  }

  protected override simulateStartHover(
      element: HTMLElement, init: PointerEventInit = {}) {
    const i = this.getInputs().indexOf(element as HTMLInputElement);
    if ((i >= 0) || (element === this.element)) {
      init = this.positionEventAtHandle(init, i === 1);
    }
    super.simulateStartHover(element, init);
  }
}
