/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../list/list.js';
import '../../focus/focus-ring.js';
import '../../elevation/elevation.js';
import { LitElement } from 'lit';
import { MdFocusRing } from '../../focus/focus-ring.js';
import { List } from '../../list/lib/list.js';
import { MenuItem } from './shared.js';
import { Corner, SurfacePositionController } from './surfacePositionController.js';
import { TypeaheadController } from './typeaheadController.js';
export { Corner } from './surfacePositionController.js';
/**
 * Element to focus on when menu is first opened.
 */
export declare type DefaultFocusState = 'NONE' | 'LIST_ROOT' | 'FIRST_ITEM' | 'LAST_ITEM';
/**
 * @fires opening Fired before the opening animation begins (not fired on quick)
 * @fires opened Fired once the menu is open, after any animations
 * @fires closing Fired before the closing animation begins (not fired on quick)
 * @fires closed Fired once the menu is closed, after any animations
 */
export declare abstract class Menu extends LitElement {
    protected readonly listElement: List | null;
    protected readonly surfaceEl: HTMLElement | null;
    protected readonly slotEl: HTMLSlotElement | null;
    protected readonly focusRing: MdFocusRing;
    ariaLabel: string;
    /**
     * The element in which the menu should align to.
     */
    anchor: HTMLElement | null;
    /**
     * Makes the element use `position:fixed` instead of `position:absolute`. In
     * most cases, the menu should position itself above most other
     * `position:absolute` or `position:fixed` elements when placed inside of
     * them. e.g. using a menu inside of an `md-dialog`.
     *
     * __NOTE__: Fixed menus will not scroll with the page and will be fixed to
     * the window instead.
     */
    fixed: boolean;
    /**
     * Skips the opening and closing animations.
     */
    quick: boolean;
    /**
     * Displays overflow content like a submenu.
     *
     * __NOTE__: This may cause adverse effects if you set
     * `md-menu {max-height:...}`
     * and have items overflowing items in the "y" direction.
     */
    hasOverflow: boolean;
    /**
     * Opens the menu and makes it visible. Alternative to the `.show()` and
     * `.close()` methods
     */
    open: boolean;
    /**
     * Offsets the menu's inline alignment from the anchor by the given number in
     * pixels. This value is direction aware and will follow the LTR / RTL
     * direction.
     *
     * e.g. LTR: positive -> right, negative -> left
     *      RTL: positive -> left, negative -> right
     */
    xOffset: number;
    /**
     * Offsets the menu's block alignment from the anchor by the given number in
     * pixels.
     *
     * e.g. positive -> down, negative -> up
     */
    yOffset: number;
    /**
     * The tabindex of the underlying list element.
     */
    listTabIndex: number;
    /**
     * The max time between the keystrokes of the typeahead menu behavior before
     * it clears the typeahead buffer.
     */
    typeaheadBufferTime: number;
    /**
     * The corner of the anchor which to align the menu in the standard logical
     * property style of <block>_<inline>.
     */
    anchorCorner: Corner;
    /**
     * The corner of the menu which to align the anchor in the standard logical
     * property style of <block>_<inline>.
     */
    menuCorner: Corner;
    /**
     * Keeps the user clicks outside the menu
     */
    stayOpenOnOutsideClick: boolean;
    /**
     * After closing, does not restore focus to the last focused element before
     * the menu was opened.
     */
    skipRestoreFocus: boolean;
    /**
     * The element that should be focused by default once opened.
     */
    defaultFocus: DefaultFocusState;
    protected openCloseAnimationSignal: import("../../motion/animation.js").AnimationSignal;
    /**
     * Whether the menu is animating upwards or downwards when opening. This is
     * helpful for calculating some animation calculations.
     */
    protected get openDirection(): 'UP' | 'DOWN';
    /**
     * The element that was focused before the menu opened.
     */
    protected lastFocusedElement: HTMLElement | null;
    /**
     * Handles typeahead navigation through the menu.
     */
    protected typeaheadController: TypeaheadController;
    /**
     * Handles positioning the surface and aligning it to the anchor.
     */
    protected menuPositionController: SurfacePositionController;
    /**
     * The menu items associated with this menu. The items must be `MenuItem`s and
     * have both the `md-menu-item` and `md-list-item` attributes.
     */
    get items(): MenuItem[];
    render(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the positionable surface element and its contents.
     */
    protected renderSurface(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the List element and its items
     */
    protected renderList(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the menu items' slot
     */
    protected renderMenuItems(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the elevation component.
     */
    protected renderElevation(): import("lit-html").TemplateResult<1>;
    /**
     * Renders the focus ring component.
     */
    protected renderFocusRing(): import("lit-html").TemplateResult<1>;
    protected getSurfaceClasses(): {
        open: boolean;
        fixed: boolean;
        'has-overflow': boolean;
    };
    protected onListFocus(): void;
    protected onListClick(): void;
    protected onListBlur(): void;
    /**
     * Saves the last focused element focuses the new element based on
     * `defaultFocus`, and animates open.
     */
    protected onOpened: () => void;
    /**
     * Animates closed.
     */
    protected beforeClose: () => Promise<void>;
    /**
     * Focuses the last focused element.
     */
    protected onClosed: () => void;
    /**
     * Performs the opening animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    protected animateOpen(): void;
    /**
     * Performs the closing animation:
     *
     * https://direct.googleplex.com/#/spec/295000003+271060003
     */
    protected animateClose(): Promise<unknown>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected onWindowClick: (e: MouseEvent) => void;
    protected onCloseMenu(e: Event): void;
    protected onDeactivateItems(e: Event): void;
    focus(): void;
    close(): void;
    show(): void;
}