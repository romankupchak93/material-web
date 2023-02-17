/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { StaticValue } from 'lit/static-html.js';
import { TextField } from '../../textfield/lib/text-field.js';
import { AutocompleteItem } from './autocompleteitem/autocomplete-item.js';
import { AutocompleteList } from './autocompletelist/autocomplete-list.js';
import { AutocompleteSurface } from './autocompletesurface/autocomplete-surface.js';
/** @soyCompatible */
export declare abstract class Autocomplete extends TextField {
    static shadowRootOptions: ShadowRootInit;
    readonly role = "combobox";
    readonly ariaAutoComplete = "list";
    /**
     * The ID prefix for the item elements, used for SSR.
     */
    itemIdPrefix: string;
    protected abstract readonly menuSurfaceTag: StaticValue;
    protected abstract readonly listTag: StaticValue;
    menuSurface?: AutocompleteSurface | null;
    list?: AutocompleteList | null;
    protected slottedItems?: AutocompleteItem[];
    value: string;
    protected selectedItem: AutocompleteItem | null;
    /** @soyTemplate */
    render(): TemplateResult;
    /** @soyTemplate */
    protected getAutocompleteRenderClasses(): ClassInfo;
    protected updated(changedProperties: PropertyValues): void;
    firstUpdated(changedProperties: PropertyValues): void;
    /** @soyTemplate */
    protected renderMenuSurface(): TemplateResult;
    isOpen(): boolean;
    open(): void;
    close(): void;
    protected handleClicked(event: PointerEvent): void;
    protected handleFocusout(): void;
    protected handleAction(event: CustomEvent<{
        item: AutocompleteItem;
    }>): void;
    protected handleKeydown(event: KeyboardEvent): void;
    protected handleKeyup(event: KeyboardEvent): void;
    /**
     * When selectedItem is updated, item prefixes and aria-selected status will
     * be updated along with scrolling the selected item into view, if needed.
     */
    private updateSelectedItem;
    private getPreviousItem;
    private getNextItem;
}
