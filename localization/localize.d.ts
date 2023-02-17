/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TemplateResult } from 'lit';
/** Options object to the `msg()` function */
export interface MsgOptions {
    id?: string;
    desc?: string;
}
/** stand-in for lit-localize str function */
export declare function str(strings: TemplateStringsArray, ...values: unknown[]): string;
/** stand-in for lit-localize msg function */
export declare function msg<T extends (string | TemplateResult)>(template: T, options?: MsgOptions): T;