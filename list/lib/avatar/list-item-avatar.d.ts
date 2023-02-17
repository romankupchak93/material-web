/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, TemplateResult } from 'lit';
export declare class ListItemAvatar extends LitElement {
    /**
     * The image `src` for the avatar
     */
    avatar: string;
    /**
     * The image `alt`.
     */
    altText: string;
    /**
     * The image `loading` attribute.
     */
    loading: 'eager' | 'lazy';
    render(): TemplateResult;
}
