/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItemEl } from '../listitem/list-item.js';
export declare class ListItemLink extends ListItemEl {
    /**
     * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
     */
    href: string;
    /**
     * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
     */
    target: string;
    protected renderListItem(content: unknown): import("lit-html").TemplateResult<1>;
}
