/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// Required for @ariaProperty
// tslint:disable:no-new-decorators
import '../../list/list.js';
import '../../focus/focus-ring.js';
import '../../elevation/elevation.js';
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ariaProperty } from '../../decorators/aria-property.js';
import { MdFocusRing } from '../../focus/focus-ring.js';
import { pointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { List } from '../../list/lib/list.js';
import { createAnimationSignal, EASING } from '../../motion/animation.js';
import { SurfacePositionController } from './surfacePositionController.js';
import { TypeaheadController } from './typeaheadController.js';
/**
 * Gets the currently focused element on the page.
 *
 * @param activeDoc The document or shadowroot from which to start the search.
 *    Defaults to `window.document`
 * @return Returns the currently deeply focused element or `null` if none.
 */
function getFocusedElement(activeDoc = document) {
    const activeEl = activeDoc.activeElement;
    if (!activeEl) {
        return null;
    }
    if (activeEl.shadowRoot) {
        return getFocusedElement(activeEl.shadowRoot) ?? activeEl;
    }
    return activeEl;
}
/**
 * @fires opening Fired before the opening animation begins (not fired on quick)
 * @fires opened Fired once the menu is open, after any animations
 * @fires closing Fired before the closing animation begins (not fired on quick)
 * @fires closed Fired once the menu is closed, after any animations
 */
export class Menu extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The element in which the menu should align to.
         */
        this.anchor = null;
        /**
         * Makes the element use `position:fixed` instead of `position:absolute`. In
         * most cases, the menu should position itself above most other
         * `position:absolute` or `position:fixed` elements when placed inside of
         * them. e.g. using a menu inside of an `md-dialog`.
         *
         * __NOTE__: Fixed menus will not scroll with the page and will be fixed to
         * the window instead.
         */
        this.fixed = false;
        /**
         * Skips the opening and closing animations.
         */
        this.quick = false;
        /**
         * Displays overflow content like a submenu.
         *
         * __NOTE__: This may cause adverse effects if you set
         * `md-menu {max-height:...}`
         * and have items overflowing items in the "y" direction.
         */
        this.hasOverflow = false;
        /**
         * Opens the menu and makes it visible. Alternative to the `.show()` and
         * `.close()` methods
         */
        this.open = false;
        /**
         * Offsets the menu's inline alignment from the anchor by the given number in
         * pixels. This value is direction aware and will follow the LTR / RTL
         * direction.
         *
         * e.g. LTR: positive -> right, negative -> left
         *      RTL: positive -> left, negative -> right
         */
        this.xOffset = 0;
        /**
         * Offsets the menu's block alignment from the anchor by the given number in
         * pixels.
         *
         * e.g. positive -> down, negative -> up
         */
        this.yOffset = 0;
        /**
         * The tabindex of the underlying list element.
         */
        this.listTabIndex = 0;
        /**
         * The max time between the keystrokes of the typeahead menu behavior before
         * it clears the typeahead buffer.
         */
        this.typeaheadBufferTime = 200;
        /**
         * The corner of the anchor which to align the menu in the standard logical
         * property style of <block>_<inline>.
         */
        this.anchorCorner = 'END_START';
        /**
         * The corner of the menu which to align the anchor in the standard logical
         * property style of <block>_<inline>.
         */
        this.menuCorner = 'START_START';
        /**
         * Keeps the user clicks outside the menu
         */
        this.stayOpenOnOutsideClick = false;
        /**
         * After closing, does not restore focus to the last focused element before
         * the menu was opened.
         */
        this.skipRestoreFocus = false;
        /**
         * The element that should be focused by default once opened.
         */
        this.defaultFocus = 'LIST_ROOT';
        this.openCloseAnimationSignal = createAnimationSignal();
        /**
         * The element that was focused before the menu opened.
         */
        this.lastFocusedElement = null;
        /**
         * Handles typeahead navigation through the menu.
         */
        this.typeaheadController = new TypeaheadController(() => {
            return {
                getItems: () => this.items,
                typeaheadBufferTime: this.typeaheadBufferTime,
            };
        });
        /**
         * Handles positioning the surface and aligning it to the anchor.
         */
        this.menuPositionController = new SurfacePositionController(this, () => {
            return {
                anchorCorner: this.anchorCorner,
                surfaceCorner: this.menuCorner,
                surfaceEl: this.surfaceEl,
                anchorEl: this.anchor,
                isTopLayer: this.fixed,
                isOpen: this.open,
                xOffset: this.xOffset,
                yOffset: this.yOffset,
                onOpen: this.onOpened,
                beforeClose: this.beforeClose,
                onClose: this.onClosed,
            };
        });
        /**
         * Saves the last focused element focuses the new element based on
         * `defaultFocus`, and animates open.
         */
        this.onOpened = () => {
            this.lastFocusedElement = getFocusedElement();
            if (!this.listElement)
                return;
            const items = this.listElement.items;
            const activeItemRecord = List.getActiveItem(items);
            if (activeItemRecord && this.defaultFocus !== 'NONE') {
                activeItemRecord.item.active = false;
            }
            switch (this.defaultFocus) {
                case 'FIRST_ITEM':
                    const first = List.getFirstActivatableItem(items);
                    if (first) {
                        first.active = true;
                    }
                    break;
                case 'LAST_ITEM':
                    const last = List.getLastActivatableItem(items);
                    if (last) {
                        last.active = true;
                    }
                    break;
                case 'LIST_ROOT':
                    this.listElement?.focus();
                    break;
                default:
                case 'NONE':
                    // Do nothing.
                    break;
            }
            if (this.quick) {
                this.dispatchEvent(new Event('opened'));
            }
            else {
                this.animateOpen();
            }
        };
        /**
         * Animates closed.
         */
        this.beforeClose = async () => {
            this.open = false;
            if (!this.quick) {
                await this.animateClose();
            }
        };
        /**
         * Focuses the last focused element.
         */
        this.onClosed = () => {
            if (this.quick) {
                this.dispatchEvent(new Event('closed'));
            }
            if (!this.skipRestoreFocus) {
                this.lastFocusedElement?.focus?.();
            }
        };
        this.onWindowClick = (e) => {
            if (!this.stayOpenOnOutsideClick && !e.composedPath().includes(this)) {
                this.open = false;
            }
        };
    }
    /**
     * Whether the menu is animating upwards or downwards when opening. This is
     * helpful for calculating some animation calculations.
     */
    get openDirection() {
        const menuCornerBlock = this.menuCorner.split('_')[0];
        return menuCornerBlock === 'START' ? 'DOWN' : 'UP';
    }
    /**
     * The menu items associated with this menu. The items must be `MenuItem`s and
     * have both the `md-menu-item` and `md-list-item` attributes.
     */
    get items() {
        const listElement = this.listElement;
        if (listElement) {
            return listElement.items.filter(el => el.hasAttribute('md-menu-item'));
        }
        return [];
    }
    render() {
        return this.renderSurface();
    }
    /**
     * Renders the positionable surface element and its contents.
     */
    renderSurface() {
        return html `
       <div
           class="menu ${classMap(this.getSurfaceClasses())}"
           style=${styleMap(this.menuPositionController.surfaceStyles)}>
        ${this.renderList()} 
        ${this.renderElevation()}
        ${this.renderFocusRing()}
       </div>
     `;
    }
    /**
     * Renders the List element and its items
     */
    renderList() {
        return html `
       <md-list
           .ariaLabel=${this.ariaLabel}
           role="menu"
           listTabIndex=${this.listTabIndex}
           @focus=${this.onListFocus}
           @blur=${this.onListBlur}
           @click=${this.onListClick}
           @keydown=${this.typeaheadController.onKeydown}>
         ${this.renderMenuItems()}
       </md-list>`;
    }
    /**
     * Renders the menu items' slot
     */
    renderMenuItems() {
        return html `<slot
        @close-menu=${this.onCloseMenu}
        @deactivate-items=${this.onDeactivateItems}></slot>`;
    }
    /**
     * Renders the elevation component.
     */
    renderElevation() {
        return html `<md-elevation shadow surface></md-elevation>`;
    }
    /**
     * Renders the focus ring component.
     */
    renderFocusRing() {
        return html `<md-focus-ring></md-focus-ring>`;
    }
    getSurfaceClasses() {
        return {
            open: this.open,
            fixed: this.fixed,
            'has-overflow': this.hasOverflow,
        };
    }
    onListFocus() {
        this.focusRing.visible = shouldShowStrongFocus();
    }
    onListClick() {
        pointerPress();
        this.focusRing.visible = shouldShowStrongFocus();
    }
    onListBlur() {
        this.focusRing.visible = false;
    }
    /**
     * Performs the opening animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    animateOpen() {
        const surfaceEl = this.surfaceEl;
        const slotEl = this.slotEl;
        if (!surfaceEl || !slotEl)
            return;
        const openDirection = this.openDirection;
        this.dispatchEvent(new Event('opening'));
        // needs to be imperative because we don't want to mix animation and Lit
        // render timing
        surfaceEl.classList.toggle('animating', true);
        const signal = this.openCloseAnimationSignal.start();
        const height = surfaceEl.offsetHeight;
        const openingUpwards = openDirection === 'UP';
        const children = this.items;
        const FULL_DURATION = 500;
        const SURFACE_OPACITY_DURATION = 50;
        const ITEM_OPACITY_DURATION = 250;
        // We want to fit every child fade-in animation within the full duration of
        // the animation.
        const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
        const surfaceHeightAnimation = surfaceEl.animate([{ height: '0px' }, { height: `${height}px` }], {
            duration: FULL_DURATION,
            easing: EASING.EMPHASIZED,
        });
        // When we are opening upwards, we want to make sure the last item is always
        // in view, so we need to translate it upwards the opposite direction of the
        // height animation
        const upPositionCorrectionAnimation = slotEl.animate([
            { transform: openingUpwards ? `translateY(-${height}px)` : '' },
            { transform: '' }
        ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
        const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
        const childrenAnimations = [];
        for (let i = 0; i < children.length; i++) {
            // If we are animating upwards, then reverse the children list.
            const directionalIndex = openingUpwards ? children.length - 1 - i : i;
            const child = children[directionalIndex];
            const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: ITEM_OPACITY_DURATION,
                delay: DELAY_BETWEEN_ITEMS * i,
            });
            // Make them all initially hidden and then clean up at the end of each
            // animation.
            child.classList.toggle('hidden', true);
            animation.addEventListener('finish', () => {
                child.classList.toggle('hidden', false);
            });
            childrenAnimations.push([child, animation]);
        }
        signal.addEventListener('abort', () => {
            surfaceHeightAnimation.cancel();
            upPositionCorrectionAnimation.cancel();
            surfaceOpacityAnimation.cancel();
            childrenAnimations.forEach(([child, animation]) => {
                child.classList.toggle('hidden', false);
                animation.cancel();
            });
        });
        surfaceHeightAnimation.addEventListener('finish', () => {
            surfaceEl.classList.toggle('animating', false);
            this.openCloseAnimationSignal.finish();
            this.dispatchEvent(new Event('opened'));
        });
    }
    /**
     * Performs the closing animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    animateClose() {
        let resolve;
        let reject;
        // This promise blocks the surface position controller from setting
        // display: none on the surface which will interfere with this animation.
        const animationEnded = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        const surfaceEl = this.surfaceEl;
        const slotEl = this.slotEl;
        if (!surfaceEl || !slotEl) {
            reject();
            return animationEnded;
        }
        const openDirection = this.openDirection;
        const closingDownwards = openDirection === 'UP';
        this.dispatchEvent(new Event('closing'));
        // needs to be imperative because we don't want to mix animation and Lit
        // render timing
        surfaceEl.classList.toggle('animating', true);
        const signal = this.openCloseAnimationSignal.start();
        const height = surfaceEl.offsetHeight;
        const children = this.items;
        const FULL_DURATION = 150;
        const SURFACE_OPACITY_DURATION = 50;
        // The surface fades away at the very end
        const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
        const ITEM_OPACITY_DURATION = 50;
        const ITEM_OPACITY_INITIAL_DELAY = 50;
        const END_HEIGHT_PRECENTAGE = .35;
        // We want to fit every child fade-out animation within the full duration of
        // the animation.
        const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) /
            children.length;
        // The mock has the animation shrink to 35%
        const surfaceHeightAnimation = surfaceEl.animate([
            { height: `${height}px` },
            { height: `${height * END_HEIGHT_PRECENTAGE}px` }
        ], {
            duration: FULL_DURATION,
            easing: EASING.EMPHASIZED_ACCELERATE,
        });
        // When we are closing downwards, we want to make sure the last item is
        // always in view, so we need to translate it upwards the opposite direction
        // of the height animation
        const downPositionCorrectionAnimation = slotEl.animate([
            { transform: '' }, {
                transform: closingDownwards ?
                    `translateY(-${height * (1 - END_HEIGHT_PRECENTAGE)}px)` :
                    ''
            }
        ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
        const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
        const childrenAnimations = [];
        for (let i = 0; i < children.length; i++) {
            // If the animation is closing upwards, then reverse the list of
            // children so that we animate in the opposite direction.
            const directionalIndex = closingDownwards ? i : children.length - 1 - i;
            const child = children[directionalIndex];
            const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: ITEM_OPACITY_DURATION,
                delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i,
            });
            // Make sure the items stay hidden at the end of each child animation.
            // We clean this up at the end of the overall animation.
            animation.addEventListener('finish', () => {
                child.classList.toggle('hidden', true);
            });
            childrenAnimations.push([child, animation]);
        }
        signal.addEventListener('abort', () => {
            surfaceHeightAnimation.cancel();
            downPositionCorrectionAnimation.cancel();
            surfaceOpacityAnimation.cancel();
            childrenAnimations.forEach(([child, animation]) => {
                animation.cancel();
                child.classList.toggle('hidden', false);
            });
            reject();
        });
        surfaceHeightAnimation.addEventListener('finish', () => {
            surfaceEl.classList.toggle('animating', false);
            childrenAnimations.forEach(([child]) => {
                child.classList.toggle('hidden', false);
            });
            this.openCloseAnimationSignal.finish();
            this.dispatchEvent(new Event('closed'));
            resolve(true);
        });
        return animationEnded;
    }
    connectedCallback() {
        super.connectedCallback();
        if (window && window.addEventListener) {
            window.addEventListener('click', this.onWindowClick, { capture: true });
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (window && window.removeEventListener) {
            window.removeEventListener('click', this.onWindowClick);
        }
    }
    onCloseMenu(e) {
        this.close();
    }
    onDeactivateItems(e) {
        e.stopPropagation();
        const items = this.items;
        for (const item of items) {
            item.active = false;
        }
    }
    focus() {
        this.listElement?.focus();
    }
    close() {
        this.open = false;
        this.items.forEach(item => {
            item.close?.();
        });
    }
    show() {
        this.open = true;
    }
}
__decorate([
    query('md-list'),
    __metadata("design:type", List)
], Menu.prototype, "listElement", void 0);
__decorate([
    query('.menu'),
    __metadata("design:type", HTMLElement)
], Menu.prototype, "surfaceEl", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLSlotElement)
], Menu.prototype, "slotEl", void 0);
__decorate([
    query('md-focus-ring'),
    __metadata("design:type", MdFocusRing)
], Menu.prototype, "focusRing", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    __metadata("design:type", String)
], Menu.prototype, "ariaLabel", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", HTMLElement)
], Menu.prototype, "anchor", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Menu.prototype, "fixed", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Menu.prototype, "quick", void 0);
__decorate([
    property({ type: Boolean, attribute: 'has-overflow' }),
    __metadata("design:type", Object)
], Menu.prototype, "hasOverflow", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Menu.prototype, "open", void 0);
__decorate([
    property({ type: Number, attribute: 'x-offset' }),
    __metadata("design:type", Object)
], Menu.prototype, "xOffset", void 0);
__decorate([
    property({ type: Number, attribute: 'y-offset' }),
    __metadata("design:type", Object)
], Menu.prototype, "yOffset", void 0);
__decorate([
    property({ type: Number, attribute: 'list-tab-index' }),
    __metadata("design:type", Object)
], Menu.prototype, "listTabIndex", void 0);
__decorate([
    property({ type: Number, attribute: 'typeahead-delay' }),
    __metadata("design:type", Object)
], Menu.prototype, "typeaheadBufferTime", void 0);
__decorate([
    property({ type: String, attribute: 'anchor-corner' }),
    __metadata("design:type", String)
], Menu.prototype, "anchorCorner", void 0);
__decorate([
    property({ type: String, attribute: 'menu-corner' }),
    __metadata("design:type", String)
], Menu.prototype, "menuCorner", void 0);
__decorate([
    property({ type: Boolean, attribute: 'stay-open-on-outside-click' }),
    __metadata("design:type", Object)
], Menu.prototype, "stayOpenOnOutsideClick", void 0);
__decorate([
    property({ type: Boolean, attribute: 'skip-restore-focus' }),
    __metadata("design:type", Object)
], Menu.prototype, "skipRestoreFocus", void 0);
__decorate([
    property({ type: String, attribute: 'default-focus' }),
    __metadata("design:type", String)
], Menu.prototype, "defaultFocus", void 0);
//# sourceMappingURL=menu.js.map