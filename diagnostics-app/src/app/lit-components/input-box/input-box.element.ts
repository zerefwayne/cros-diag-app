/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-box')
class InputBoxElement extends LitElement {
  @property({ type: String })
  name: string = '';

  connectedCallback() {
    super.connectedCallback();
  }

  _inputHandler(e: Event) {
    const inputVal = (<HTMLInputElement>e.composedPath()[0]).value;
    this.name = inputVal;
    //@ts-ignore
    this.dispatchEvent(
      new CustomEvent('changed', { detail: { value: inputVal } })
    );
  }

  render() {
    return html`
      <div>
        <div>
          <label for="name">Set name: </label>
          <input
            id="name"
            type="text"
            .value=${this.name}
            @input=${this._inputHandler}
          />
        </div>
        <div>
          <p>Hello, ${this.name}. I am being rendered from Lit!</p>
        </div>
      </div>
    `;
  }
}
