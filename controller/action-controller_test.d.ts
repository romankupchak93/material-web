/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement } from 'lit';
import { ActionController, ActionControllerHost, BeginPressConfig, EndPressConfig } from './action-controller.js';
declare global {
    interface HTMLElementTagNameMap {
        'my-action-element': MyActionElement;
    }
}
declare class MyActionElement extends LitElement implements ActionControllerHost {
    disabled: boolean;
    ignoreClicksWithModifiers: boolean;
    actionController: ActionController;
    lastBegin?: BeginPressConfig;
    lastEnd?: EndPressConfig;
    beginPress(info: BeginPressConfig): void;
    endPress(info: EndPressConfig): void;
    render(): import("lit-html").TemplateResult<1>;
    handlePointerDown(e: PointerEvent): void;
    handlePointerUp(e: PointerEvent): void;
    handlePointerCancel(e: PointerEvent): void;
    handlePointerLeave(e: PointerEvent): void;
    handleClick(e: MouseEvent): void;
    handleContextMenu(): void;
}
export {};
