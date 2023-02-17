/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// Required for @ariaProperty
// tslint:disable:no-new-decorators
import '../../../ripple/ripple.js';
import '../../../focus/focus-ring.js';
import { html, LitElement, nothing } from 'lit';
import { property, query, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ariaProperty } from '../../../decorators/aria-property.js';
import { pointerPress, shouldShowStrongFocus } from '../../../focus/strong-focus.js';
import { ripple } from '../../../ripple/directive.js';
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class ListItemEl extends LitElement {
    constructor() {
        super(...arguments);
        // @ts-ignore(b/264292293): Use `override` with TS 4.9+
        this.role = 'listitem';
        /**
         * The primary, headline text of the list item.
         */
        this.headline = '';
        /**
         * The one-line supporting text below the headline.
         */
        this.supportingText = '';
        /**
         * The multi-line supporting text below the headline. __NOTE:__ if set to a
         * truthy value, overrides the visibility and behavior of `supportingText`.
         */
        this.multiLineSupportingText = '';
        /**
         * The supporting text placed at the end of the item. Overriden by elements
         * slotted into the `end` slot.
         */
        this.trailingSupportingText = '';
        /**
         * Disables the item and makes it non-selectable and non-interactive.
         */
        this.disabled = false;
        /**
         * The tabindex of the underlying item.
         *
         * __NOTE:__ this is overriden by the keyboard behavior of `md-list` and by
         * setting `selected`.
         */
        this.itemTabIndex = -1;
        /**
         * Whether or not the element is in the selected visual state. When active,
         * tabindex is set to 0, and in some list item variants (like md-list-item),
         * focuses the underlying item.
         */
        this.active = false;
        /**
         * READONLY. Sets the `md-list-item` attribute on the element.
         */
        this.isListItem = true;
        this.showFocusRing = false;
        this.showRipple = false;
        /**
         * Only meant to be overriden by subclassing and not by the user. This is
         * so that we have control over focus on specific variants such as disabling
         * focus on <md-autocomplete-item> but enabling it for <md-menu-item>.
         */
        this.focusOnSelection = true;
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.isFirstUpdate = true;
    }
    willUpdate(changed) {
        if (changed.has('active') && !this.disabled) {
            if (this.active) {
                this.itemTabIndex = 0;
                if (this.focusOnSelection) {
                    this.showFocusRing = shouldShowStrongFocus();
                }
                // Do not reset anything if it's the first render because user could
                // have set `itemTabIndex` manually.
            }
            else if (!this.isFirstUpdate) {
                this.itemTabIndex = -1;
            }
        }
    }
    render() {
        return this.renderListItem(html `
      ${this.renderStart()}
      ${this.renderBody()}
      ${this.renderEnd()}
      <div class="ripple">
        ${this.renderRipple()}
      </div>
      <div class="focus-ring">
        ${this.renderFocusRing()}
      </div>`);
    }
    /**
     * Renders the root list item.
     *
     * @param content {unkown} the child content of the list item.
     */
    renderListItem(content) {
        return html `
      <li
          tabindex=${this.disabled ? -1 : this.itemTabIndex}
          role=${this.role}
          aria-selected=${this.ariaSelected || nothing}
          aria-checked=${this.ariaChecked || nothing}
          class="list-item ${classMap(this.getRenderClasses())}"
          @pointerdown=${this.onPointerdown}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @click=${this.onClick}
          @pointerenter=${this.onPointerenter}
          @pointerleave=${this.onPointerleave}
          @keydown=${this.onKeydown}
          ${ripple(this.getRipple)}>${content}</li>`;
    }
    /**
     * Handles rendering of the ripple element.
     */
    renderRipple() {
        return this.showRipple ?
            html `<md-ripple ?disabled="${this.disabled}"></md-ripple>` :
            nothing;
    }
    /**
     * Handles rendering of the focus ring.
     */
    renderFocusRing() {
        return html `<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    /**
     * Classes applied to the list item root.
     */
    getRenderClasses() {
        return {
            'with-one-line': this.supportingText === '' && this.multiLineSupportingText === '',
            'with-two-line': this.supportingText !== '' && this.multiLineSupportingText === '',
            'with-three-line': this.multiLineSupportingText !== '',
            'disabled': this.disabled,
            'enabled': !this.disabled,
        };
    }
    /**
     * The content rendered at the start of the list item.
     */
    renderStart() {
        return html `<div class="start"><slot name="start"></slot></div>`;
    }
    /**
     * Handles rendering the headline and supporting text.
     */
    renderBody() {
        const supportingText = this.multiLineSupportingText !== '' ?
            this.renderMultiLineSupportingText() :
            this.supportingText !== '' ? this.renderSupportingText() :
                '';
        return html `<div class="body"
      ><span class="label-text">${this.headline}</span>${supportingText}</div>`;
    }
    /**
     * Renders the one-line supporting text.
     */
    renderSupportingText() {
        return html `<span class="supporting-text">${this.supportingText}</span>`;
    }
    /**
     * Renders the multi-line supporting text
     */
    renderMultiLineSupportingText() {
        return html `<span class="supporting-text supporting-text--multi-line"
      >${this.multiLineSupportingText}</span>`;
    }
    /**
     * The content rendered at the end of the list item.
     */
    renderEnd() {
        const supportingText = this.trailingSupportingText !== '' ?
            this.renderTrailingSupportingText() :
            '';
        return html `<div class="end"
      ><slot name="end">${supportingText}</slot></div>`;
    }
    /**
     * Renders the supporting text at the end of the list item.
     */
    renderTrailingSupportingText() {
        return html `<span class="trailing-supporting-text"
      >${this.trailingSupportingText}</span>`;
    }
    onPointerdown() {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    onFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    onBlur() {
        this.showFocusRing = false;
    }
    // For easier overriding in menu-item
    onClick(e) { }
    onKeydown(e) { }
    onPointerenter(e) { }
    onPointerleave(e) { }
    updated(changed) {
        super.updated(changed);
        // will focus the list item root if it is selected but not on the first
        // update or else it may cause the page to jump on first load.
        if (changed.has('active') && !this.isFirstUpdate && this.active &&
            this.focusOnSelection) {
            this.listItemRoot.focus();
        }
        this.isFirstUpdate = false;
    }
}
__decorate([
    ariaProperty
    // tslint:disable-next-line
    ,
    property({ type: String, attribute: 'data-role', noAccessor: true }),
    __metadata("design:type", String)
], ListItemEl.prototype, "role", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-selected', noAccessor: true }),
    __metadata("design:type", String)
], ListItemEl.prototype, "ariaSelected", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-checked', noAccessor: true }),
    __metadata("design:type", String)
], ListItemEl.prototype, "ariaChecked", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "headline", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "supportingText", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "multiLineSupportingText", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "trailingSupportingText", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemEl.prototype, "disabled", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], ListItemEl.prototype, "itemTabIndex", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], ListItemEl.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, attribute: 'md-list-item', reflect: true }),
    __metadata("design:type", Object)
], ListItemEl.prototype, "isListItem", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], ListItemEl.prototype, "ripple", void 0);
__decorate([
    query('.list-item'),
    __metadata("design:type", HTMLElement)
], ListItemEl.prototype, "listItemRoot", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ListItemEl.prototype, "showRipple", void 0);
//# sourceMappingURL=list-item.js.map