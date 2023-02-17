/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TestTable } from './lib/test-table.js';
export { TestTableTemplate } from './lib/test-table.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-test-table': MdTestTable;
    }
}
/**
 * @soyCompatible
 * @final
 */
export declare class MdTestTable<S extends string = string> extends TestTable<S> {
    static styles: any[];
}
