/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * FormAssociatedElement interface
 */
export interface FormAssociatedElement extends HTMLElement {
}
/**
 * Returns true if the element is a form associated custom element (FACE).
 */
export declare function isFormAssociated(element: FormAssociatedElement): boolean;