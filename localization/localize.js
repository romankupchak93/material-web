/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** stand-in for lit-localize str function */
export function str(strings, ...values) {
    let out = strings[0];
    for (let i = 1; i < strings.length; i++) {
        out += String(values[i - 1]) + strings[i];
    }
    return out;
}
/** stand-in for lit-localize msg function */
export function msg(template, options) {
    return template;
}
//# sourceMappingURL=localize.js.map