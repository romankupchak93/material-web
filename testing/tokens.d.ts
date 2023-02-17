/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResult } from 'lit';
/**
 * Create tests for `MdComponent.styles` that checks for undefined or unused
 * tokens.
 *
 * @param styles An array of `CSSResult`s to run tests on.
 */
export declare function createTokenTests(styles: CSSResult[]): void;
/**
 * Retrieves all undefined tokens. This method checks for any
 * `--_local-custom-property` that is used, but does not have a CSS style
 * declaration giving it a value.
 *
 * @example
 * :host {
 *   --_defined-token: 8px;
 *   border-radius: var(--_undefined-token);
 * }
 *
 * // returns ['--_undefined-token']
 *
 * @param styles An array of `CSSResult`s to get undefined tokens for.
 * @return An array of all token names that are undefined.
 */
export declare function getUndefinedTokens(styles: CSSResult[]): string[];
/**
 * Retrieves all unused tokens. This method checks for any
 * `--_local-custom-property` that has a CSS declaration value, but it otherwise
 * unused.
 *
 * @example
 * :host {
 *   --_used-token: 8px;
 *   --_unused-token: 8px;
 *   border-radius: var(--_used-token);
 * }
 *
 * // returns ['--_unused-token']
 *
 * @param styles An array of `CSSResult`s to get unused tokens for.
 * @return An array of all token names that are unused.
 */
export declare function getUnusedTokens(styles: CSSResult[]): string[];
