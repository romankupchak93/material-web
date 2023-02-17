/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { html as staticHtml } from 'lit/static-html.js';
import { TextField } from '../../textfield/lib/text-field.js';
import { AutocompleteItem } from './autocompleteitem/autocomplete-item.js';
import { AutocompleteList } from './autocompletelist/autocomplete-list.js';
import { AutocompleteSurface } from './autocompletesurface/autocomplete-surface.js';
/** @soyCompatible */
export class Autocomplete extends TextField {
    constructor() {
        super(...arguments);
        this.role = 'combobox';
        this.ariaAutoComplete = 'list';
        /**
         * The ID prefix for the item elements, used for SSR.
         */
        this.itemIdPrefix = 'autocomplete-item';
        this.value = '';
        this.selectedItem = null;
    }
    /** @soyTemplate */
    render() {
        return html `<div class="md3-autocomplete ${classMap(this.getAutocompleteRenderClasses())}"
            @click=${this.handleClicked}
            @focusout=${this.handleFocusout}
            @action=${this.handleAction}
            @input=${this.handleInput}
            @keydown=${this.handleKeydown}
            @keyup=${this.handleKeyup}>
            ${super.render()}
            ${this.renderMenuSurface()}</div>`;
    }
    /** @soyTemplate */
    getAutocompleteRenderClasses() {
        return {};
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('selectedItem')) {
            this.updateSelectedItem();
            // TODO(b/265209253): implement
            // this.ariaActiveDescendant = this.selectedItem?.itemId ?? null;
        }
        if (changedProperties.has('value')) {
            this.dispatchEvent(new CustomEvent('autocomplete-value-changed', { detail: { value: this.value }, bubbles: true, composed: true }));
        }
    }
    firstUpdated(changedProperties) {
        console.warn('<md-autocomplete> is not yet implemented.');
        super.firstUpdated(changedProperties);
        this.menuSurface.anchor = this;
    }
    /** @soyTemplate */
    renderMenuSurface() {
        return staticHtml `<${this.menuSurfaceTag}
      class="md3-autocomplete__menu-surface">
      <${this.listTag} class="md3-autocomplete__list">
        <slot></slot>
      </${this.listTag}>
    </${this.menuSurfaceTag}>`;
    }
    isOpen() {
        return this.menuSurface?.open || false;
    }
    open() {
        this.menuSurface?.show();
        this.ariaExpanded = 'true';
    }
    close() {
        this.menuSurface?.close();
        this.selectedItem = null;
        this.ariaExpanded = 'false';
    }
    handleClicked(event) {
        // When clicking the list (not items nor text field) the menu should stay
        // open.
        if (this.isOpen() &&
            event.target?.parentNode !== this.menuSurface) {
            this.close();
        }
        else {
            this.open();
        }
    }
    handleFocusout() {
        if (this.matches(':focus-within')) {
            this.getInput().focus();
            return;
        }
        this.close();
        this.focused = false;
    }
    handleAction(event) {
        const detail = event.detail;
        this.value = detail.item.headline;
    }
    handleKeydown(event) {
        let bubble = true;
        const altKey = event.altKey;
        switch (event.key) {
            case 'Enter':
                if (this.selectedItem) {
                    this.value = this.selectedItem.headline;
                }
                this.close();
                bubble = false;
                break;
            case 'ArrowDown':
                if (!this.slottedItems)
                    return;
                if (this.slottedItems.length) {
                    if (this.selectedItem) {
                        this.selectedItem = this.getNextItem();
                    }
                    else {
                        this.open();
                        if (!altKey) {
                            this.selectedItem = this.slottedItems[0];
                        }
                    }
                }
                bubble = false;
                break;
            case 'ArrowUp':
                if (!this.slottedItems)
                    return;
                if (this.slottedItems.length) {
                    if (this.selectedItem) {
                        this.selectedItem = this.getPreviousItem();
                    }
                    else {
                        this.open();
                        if (!altKey) {
                            this.selectedItem =
                                this.slottedItems[this.slottedItems.length - 1];
                        }
                    }
                }
                bubble = false;
                break;
            case 'Escape':
                if (this.isOpen()) {
                    this.close();
                }
                else {
                    this.value = '';
                }
                this.selectedItem = null;
                bubble = false;
                break;
            case 'Tab':
                if (this.selectedItem) {
                    this.value = this.selectedItem.headline;
                }
                this.close();
                break;
            case 'Home':
                this.setSelectionRange(0, 0);
                this.selectedItem = null;
                bubble = false;
                break;
            case 'End':
                this.setSelectionRange(this.value.length, this.value.length);
                this.selectedItem = null;
                bubble = false;
                break;
            default:
                break;
        }
        if (bubble)
            return;
        event.stopPropagation();
        event.preventDefault();
    }
    handleKeyup(event) {
        let bubble = true;
        switch (event.key) {
            case 'Backspace':
            case 'ArrowLeft':
            case 'ArrowRight':
                this.selectedItem = null;
                bubble = false;
                break;
            default:
                break;
        }
        if (bubble)
            return;
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * When selectedItem is updated, item prefixes and aria-selected status will
     * be updated along with scrolling the selected item into view, if needed.
     */
    updateSelectedItem() {
        if (!this.slottedItems)
            return;
        this.slottedItems.forEach((item, index) => {
            // TODO(b/265209253): implement
            // item.itemId = `${this.itemIdPrefix}-${index}`;
            if (this.selectedItem && item === this.selectedItem && this.list) {
                item.ariaSelected = 'true';
                // Scroll into view
                if (this.list.scrollTop + this.list.offsetHeight <
                    item.offsetTop + item.offsetHeight) {
                    this.list.scrollTop =
                        item.offsetTop + item.offsetHeight - this.list.offsetHeight;
                }
                else if (this.list.scrollTop > item.offsetTop + 2) {
                    this.list.scrollTop = item.offsetTop;
                }
            }
            else {
                item.ariaSelected = 'false';
            }
        });
    }
    getPreviousItem() {
        if (!this.slottedItems)
            return null;
        const index = this.selectedItem ? this.slottedItems.indexOf(this.selectedItem) : 0;
        const length = this.slottedItems.length;
        return this.slottedItems[(index - 1 + length) % length];
    }
    getNextItem() {
        if (!this.slottedItems)
            return null;
        const index = this.selectedItem ? this.slottedItems.indexOf(this.selectedItem) : 0;
        const length = this.slottedItems.length;
        return this.slottedItems[(index + 1) % length];
    }
}
Autocomplete.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Autocomplete.prototype, "itemIdPrefix", void 0);
__decorate([
    query('.md3-autocomplete__menu-surface'),
    __metadata("design:type", AutocompleteSurface)
], Autocomplete.prototype, "menuSurface", void 0);
__decorate([
    query('.md3-autocomplete__list'),
    __metadata("design:type", AutocompleteList)
], Autocomplete.prototype, "list", void 0);
__decorate([
    queryAssignedElements({ flatten: true }),
    __metadata("design:type", Array)
], Autocomplete.prototype, "slottedItems", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Autocomplete.prototype, "value", void 0);
__decorate([
    state(),
    __metadata("design:type", AutocompleteItem)
], Autocomplete.prototype, "selectedItem", void 0);
//# sourceMappingURL=autocomplete.js.map