/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { TestTable } from './lib/test-table.js';
import { styles as testTableStyles } from './lib/test-table-styles.css.js';
/**
 * @soyCompatible
 * @final
 */
let MdTestTable = class MdTestTable extends TestTable {
};
MdTestTable.styles = [testTableStyles];
MdTestTable = __decorate([
    customElement('md-test-table')
], MdTestTable);
export { MdTestTable };
//# sourceMappingURL=test-table.js.map