/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, TemplateResult } from 'lit';
/**
 * @fires loadeddata {Event} Dispatched whenever the native HTMLVideoElement
 * fires the loadeddate event.
 */
export declare class ListItemVideo extends LitElement {
    /**
     * Displays the video in a taller format
     */
    large: boolean;
    /**
     * The underlying `<video>`'s `autoplay` property.
     */
    autoplay: boolean;
    /**
     * The underlying `<video>`'s `muted` property.
     */
    muted: boolean;
    /**
     * The underlying `<video>`'s `loop` property.
     */
    loop: boolean;
    /**
     * The underlying `<video>`'s `controls` property.
     */
    controls: boolean;
    /**
     * The underlying `<video>`'s `playsinline` property.
     */
    playsinline: boolean;
    /**
     * The underlying `<video>`'s `preload` property.
     */
    preload: '' | 'auto' | 'metadata' | 'none';
    /**
     * The underlying `<video>`'s `poster` property.
     */
    poster: string;
    /**
     * The `src` of the video.
     */
    video: string;
    /**
     * The `alt` attribute if the video.
     */
    altText: string;
    render(): TemplateResult;
}
