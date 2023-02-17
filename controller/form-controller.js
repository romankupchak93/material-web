/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { bound } from '../decorators/bound.js';
import { isFormAssociated } from './form-associated.js';
import { shimLabelSupport, SUPPORTS_FACE_LABEL } from './shim-label-activation.js';
/**
 * A unique symbol key for `FormController` elements to implement their
 * `getFormValue()` function.
 */
export const getFormValue = Symbol('getFormValue');
/**
 * A `ReactiveController` that adds `<form>` support to an element.
 *
 * Elements should also set `static formAssociated = true` which
 * provides platform support for forms. When an element is form associated,
 * it can be activated via clicks on associated label elements. It is the
 * responsibility of the element to process this click and perform any necessary
 * activation tasks, for example focusing and clicking on an internal element.
 *
 */
export class FormController {
    /**
     * Creates a new `FormController` for the given element.
     *
     * @param element The element to add `<form>` support to.
     */
    constructor(element) {
        this.element = element;
    }
    hostConnected() {
        // If the component internals are not in Shadow DOM, subscribing to form
        // data events could lead to duplicated data, which may not work correctly
        // on the server side.
        if (!this.element.shadowRoot || window.ShadyDOM?.inUse) {
            return;
        }
        // Preserve a reference to the form, since on hostDisconnected it may be
        // null if the child was removed.
        this.form = this.element.form;
        this.form?.addEventListener('formdata', this.formDataListener);
        // TODO(b/261871554) Label activation shim is currently only needed for
        // Safari. Remove it when no longer needed.
        if (isFormAssociated(this.element) && !SUPPORTS_FACE_LABEL) {
            shimLabelSupport(this.element.getRootNode());
        }
    }
    hostDisconnected() {
        this.form?.removeEventListener('formdata', this.formDataListener);
    }
    formDataListener(event) {
        if (this.element.disabled) {
            // Check for truthiness since some elements may not support disabling.
            return;
        }
        const value = this.element[getFormValue]();
        // If given a `FormData` instance, append all values to the form. This
        // allows elements to customize what is added beyond a single name/value
        // pair.
        if (value instanceof FormData) {
            for (const [key, dataValue] of value) {
                event.formData.append(key, dataValue);
            }
            return;
        }
        // Do not associate the value with the form if there is no value or no name.
        if (value === null || !this.element.name) {
            return;
        }
        event.formData.append(this.element.name, value);
    }
}
__decorate([
    bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FormDataEvent]),
    __metadata("design:returntype", void 0)
], FormController.prototype, "formDataListener", null);
//# sourceMappingURL=form-controller.js.map