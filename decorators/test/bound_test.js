/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// import 'jasmine'; (google3-only)
import { bound } from '../bound.js';
describe('@bound', () => {
    class MyClass {
        constructor() {
            this.property = function () {
                return this;
            };
            this.propertyGetAndSetValue = function () {
                return this;
            };
            this.propertySetOnlyValue = () => this;
        }
        get propertyGetAndSet() {
            return this.propertyGetAndSetValue;
        }
        set propertyGetAndSet(value) {
            this.propertyGetAndSetValue = value;
        }
        get propertyGetOnly() {
            return function () {
                return this;
            };
        }
        set propertySetOnly(value) {
            this.propertySetOnlyValue = value;
        }
        method() {
            return this;
        }
    }
    __decorate([
        bound,
        __metadata("design:type", Object)
    ], MyClass.prototype, "property", void 0);
    __decorate([
        bound,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], MyClass.prototype, "propertyGetAndSet", null);
    __decorate([
        bound,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MyClass.prototype, "propertyGetOnly", null);
    __decorate([
        bound,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], MyClass.prototype, "propertySetOnly", null);
    __decorate([
        bound,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MyClass.prototype, "method", null);
    let instanceOne;
    let instanceTwo;
    beforeEach(() => {
        instanceOne = new MyClass();
        instanceTwo = new MyClass();
    });
    it('should bind methods', () => {
        const instanceOneFn = instanceOne.method;
        const instanceTwoFn = instanceTwo.method;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
    });
    it('should bind properties', () => {
        const instanceOneFn = instanceOne.property;
        const instanceTwoFn = instanceTwo.property;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
    });
    it('should bind properties with getter and setter', () => {
        let instanceOneFn = instanceOne.propertyGetAndSet;
        let instanceTwoFn = instanceTwo.propertyGetAndSet;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
        function newValue() {
            return this;
        }
        instanceOne.propertyGetAndSet = newValue;
        instanceTwo.propertyGetAndSet = newValue;
        instanceOneFn = instanceOne.propertyGetAndSet;
        instanceTwoFn = instanceTwo.propertyGetAndSet;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
    });
    it('should bind properties with getter only', () => {
        const instanceOneFn = instanceOne.propertyGetOnly;
        const instanceTwoFn = instanceTwo.propertyGetOnly;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
    });
    it('should bind properties with setter only', () => {
        function newValue() {
            return this;
        }
        instanceOne.propertySetOnly = newValue;
        instanceTwo.propertySetOnly = newValue;
        const instanceOneFn = instanceOne.propertySetOnlyValue;
        const instanceTwoFn = instanceTwo.propertySetOnlyValue;
        expect(instanceOneFn()).toBe(instanceOne);
        expect(instanceTwoFn()).toBe(instanceTwo);
    });
});
//# sourceMappingURL=bound_test.js.map