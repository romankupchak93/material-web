/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../../ripple/ripple.js';
import '../../../focus/focus-ring.js';
import { LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { MdRipple } from '../../../ripple/ripple.js';
import { ARIARole } from '../../../types/aria.js';
interface ListItemSelf {
    active: boolean;
    disabled: boolean;
}
/**
 * The interface of an item that is compatible with md-list. An item that is
 * selectable and disablable.
 */
export declare type ListItem = ListItemSelf & HTMLElement;
export declare class ListItemEl extends LitElement implements ListItem {
    role: ARIARole;
    ariaSelected: 'true' | 'false';
    ariaChecked: 'true' | 'false';
    /**
     * The primary, headline text of the list item.
     */
    headline: string;
    /**
     * The one-line supporting text below the headline.
     */
    supportingText: string;
    /**
     * The multi-line supporting text below the headline. __NOTE:__ if set to a
     * truthy value, overrides the visibility and behavior of `supportingText`.
     */
    multiLineSupportingText: string;
    /**
     * The supporting text placed at the end of the item. Overriden by elements
     * slotted into the `end` slot.
     */
    trailingSupportingText: string;
    /**
     * Disables the item and makes it non-selectable and non-interactive.
     */
    disabled: boolean;
    /**
     * The tabindex of the underlying item.
     *
     * __NOTE:__ this is overriden by the keyboard behavior of `md-list` and by
     * setting `selected`.
     */
    itemTabIndex: number;
    /**
     * Whether or not the element is in the selected visual state. When active,
     * tabindex is set to 0, and in some list item variants (like md-list-item),
     * focuses the underlying item.
     */
    active: boolean;
    /**
     * READONLY. Sets the `md-list-item` attribute on the element.
     */
    isListItem: boolean;
    protected ripple: Promise<MdRipple | null>;
    protected listItemRoot: HTMLElement;
    protected showFocusRing: boolean;
    protected showRipple: boolean;
    /**
     * Only meant to be overriden by subclassing and not by the user. This is
     * so that we have control over focus on specific variants such as disabling
     * focus on <md-autocomplete-item> but enabling it for <md-menu-item>.
     */
    protected focusOnSelection: boolean;
    protected getRipple: () => Promise<MdRipple>;
    private isFirstUpdate;
    willUpdate(changed: PropertyValues<this>): void;
    render(): TemplateResult;
    /**
     * Renders the root list item.
     *
     * @param content {unkown} the child content of the list item.
     */
    protected renderListItem(content: unknown): TemplateResult<1>;
    /**
     * Handles rendering of the ripple element.
     */
    protected renderRipple(): TemplateResult | typeof nothing;
    /**
     * Handles rendering of the focus ring.
     */
    protected renderFocusRing(): TemplateResult;
    /**
     * Classes applied to the list item root.
     */
    protected getRenderClasses(): ClassInfo;
    /**
     * The content rendered at the start of the list item.
     */
    protected renderStart(): TemplateResult;
    /**
     * Handles rendering the headline and supporting text.
     */
    protected renderBody(): TemplateResult;
    /**
     * Renders the one-line supporting text.
     */
    protected renderSupportingText(): TemplateResult;
    /**
     * Renders the multi-line supporting text
     */
    protected renderMultiLineSupportingText(): TemplateResult;
    /**
     * The content rendered at the end of the list item.
     */
    protected renderEnd(): TemplateResult;
    /**
     * Renders the supporting text at the end of the list item.
     */
    protected renderTrailingSupportingText(): TemplateResult;
    protected onPointerdown(): void;
    protected onFocus(): void;
    protected onBlur(): void;
    protected onClick(e: Event): void;
    protected onKeydown(e: KeyboardEvent): void;
    protected onPointerenter(e: Event): void;
    protected onPointerleave(e: Event): void;
    updated(changed: PropertyValues<this>): void;
}
export {};