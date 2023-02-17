/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
import { ListItemHarness } from './lib/listitem/harness.js';
/**
 * Test harness for list.
 */
export class ListHarness extends Harness {
    /**
     * Returns the first list item element.
     */
    async getInteractiveElement() {
        await this.element.updateComplete;
        return (await this.getItems())[0].getInteractiveElement();
    }
    /** @return List item harnesses. */
    getItems() {
        return this.element.items.map((item) => new ListItemHarness(item));
    }
}
//# sourceMappingURL=harness.js.map