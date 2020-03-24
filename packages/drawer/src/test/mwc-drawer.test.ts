/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Drawer} from '@material/mwc-drawer';
import {html} from 'lit-html';

import {fixture, TestFixture} from '../../../../test/src/util/helpers';

const SCRIM_SELECTOR = '.mdc-drawer-scrim';
const HEADER_SELECTOR = '.mdc-drawer__header';
const DISMISSIBLE_CLASS = 'mdc-drawer--dismissible';

interface DrawerProps {
  hasHeader: boolean;
  type: string;
}

const defaultDrawer = html`<mwc-drawer></mwc-drawer>`;

const drawer = (propsInit: Partial<DrawerProps>) => {
  return html`
    <mwc-drawer
      ?hasHeader=${propsInit.hasHeader === true}
      .type=${propsInit.type ?? ''}>
    </mwc-drawer>
  `;
}

suite('mwc-drawer', () => {
  let fixt: TestFixture;
  let element: Drawer;

  setup(async () => {
    element = document.createElement('mwc-drawer');
    document.body.appendChild(element);
    await element.updateComplete;
  });

  teardown(() => {
    fixt.remove();
  });

  suite('basic', () => {
    setup(async () => {
      fixt = await fixture(defaultDrawer);
      element = fixt.root.querySelector('mwc-drawer')!;
    });

    test('initializes as an mwc-drawer', () => {
      assert.instanceOf(element, Drawer);
      assert.equal(element.type, '');
      assert.equal(element.open, false);
      assert.equal(element.hasHeader, false);
    });
  });

  suite('hasHeader', () => {
    setup(async () => {
      fixt = await fixture(drawer({hasHeader: true}));
      element = fixt.root.querySelector('mwc-drawer')!;
      await element.updateComplete;
    });

    test('displays a header if set', async () => {
      let header = element.shadowRoot!.querySelector(HEADER_SELECTOR);
      assert.instanceOf(header, Element);
      element.hasHeader = false;
      await element.updateComplete;
      header = element.shadowRoot!.querySelector(HEADER_SELECTOR);
      assert.equal(header, null);
    });
  });

  suite('modal type', () => {
    setup(async () => {
      fixt = await fixture(drawer({type: 'modal'}));
      element = fixt.root.querySelector('mwc-drawer')!;
      await element.updateComplete;
    });

    test('displays scrim', async () => {
      const drawer = element.shadowRoot!.querySelector('.mdc-drawer')!;
      const scrim = element.shadowRoot!.querySelector(SCRIM_SELECTOR)!;
      assert.instanceOf(scrim, Element);
      assert.isTrue(drawer.classList.contains('mdc-drawer--modal'));
    });
  });

  suite('dismissible type', () => {
    setup(async () => {
      fixt = await fixture(drawer({type: 'dismissible'}));
      element = fixt.root.querySelector('mwc-drawer')!;
      await element.updateComplete;
    });

    test('sets correct classes', async () => {
      const drawer = element.shadowRoot!.querySelector('.mdc-drawer')!;
      assert.isTrue(drawer.classList.contains(DISMISSIBLE_CLASS));
    });
  });
});
