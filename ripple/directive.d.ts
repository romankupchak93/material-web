/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, DirectiveParameters, ElementPart, PartInfo } from 'lit/directive.js';
import { Ripple } from './lib/ripple.js';
/**
 * Normalized ripple accessor type.
 *
 * Use with `await rippleFunction()`
 */
declare type RippleFunction = () => Ripple | null | Promise<Ripple | null>;
declare class RippleDirective extends Directive {
    private rippleGetter;
    private element?;
    private state;
    private checkBoundsAfterContextMenu;
    private rippleStartEvent;
    private touchTimer;
    private clickTimer;
    constructor(partInfo: PartInfo);
    render(ripple: RippleFunction | Promise<Ripple | null>): symbol;
    handleEvent(event: Event): Promise<void>;
    update(part: ElementPart, [ripple]: DirectiveParameters<this>): symbol;
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    private shouldReactToEvent;
    private isTouch;
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    private inBounds;
    private beginPress;
    private endPress;
    private waitForTouchHold;
    private click;
    private contextMenu;
    private pointerDown;
    private pointerUp;
    private pointerCancel;
    private pointerEnter;
    private pointerLeave;
}
/**
 * Connects a Ripple element to a node that drives the interaction
 *
 * @param rippleGetter A function that returns an `md-ripple` element
 * @param simulateKeyboardClick For elements that do not issue a click on
 *     keyboard interaction, pass `true` to enable press animations on Enter or
 *     Spacebar
 */
export declare const ripple: (ripple: Promise<Ripple> | RippleFunction) => import("lit-html/directive.js").DirectiveResult<typeof RippleDirective>;
export {};
