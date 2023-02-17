/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Adds an event listener for `eventName` on the given element.
 * @return Promise that resolves when `eventName` has been fired on the element.
 */
export declare function listenOnce(element: HTMLElement, eventName: string): Promise<CustomEvent>;
