/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
/**
 * @fires loadeddata {Event} Dispatched whenever the native HTMLVideoElement
 * fires the loadeddate event.
 */
export class ListItemVideo extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Displays the video in a taller format
         */
        this.large = false;
        /**
         * The underlying `<video>`'s `autoplay` property.
         */
        this.autoplay = false;
        /**
         * The underlying `<video>`'s `muted` property.
         */
        this.muted = false;
        /**
         * The underlying `<video>`'s `loop` property.
         */
        this.loop = false;
        /**
         * The underlying `<video>`'s `controls` property.
         */
        this.controls = false;
        /**
         * The underlying `<video>`'s `playsinline` property.
         */
        this.playsinline = false;
        /**
         * The underlying `<video>`'s `preload` property.
         */
        this.preload = '';
        /**
         * The underlying `<video>`'s `poster` property.
         */
        this.poster = '';
        /**
         * The `src` of the video.
         */
        this.video = '';
        /**
         * The `alt` attribute if the video.
         */
        this.altText = '';
    }
    render() {
        return html `
        <video
            @loadeddata=${() => this.dispatchEvent(new Event('loadeddata'))}
            .src="${this.video || nothing}"
            .poster="${this.poster || nothing}"
            alt="${this.altText || nothing}"
            .autoplay=${this.autoplay}
            .muted=${this.muted}
            .loop=${this.loop}
            .playsinline=${this.playsinline}
            .controls=${this.controls}
            class="md3-list-item__video ${this.large ? 'large' : ''}">
          <slot></slot>
        </video>
      `;
    }
}
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "large", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "autoplay", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "muted", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "loop", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "controls", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "playsinline", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ListItemVideo.prototype, "preload", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "poster", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "video", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], ListItemVideo.prototype, "altText", void 0);
//# sourceMappingURL=list-item-video.js.map