/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './test-table.js';
import { TestTable } from './test-table.js';
declare global {
    interface HTMLElementTagNameMap {
        'test-test-table': TestTestTable;
    }
}
declare class TestTestTable<S extends string = string> extends TestTable<S> {
}
export {};
