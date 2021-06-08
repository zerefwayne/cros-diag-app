/**
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorldElement extends LitElement {
  static styles = css`
    p {
      background-color: var(--theme-light);
      color: var(--theme-primary);
      padding: var(--spacing-m) 0;
      font-size: var(--size-l);
      display: flex;
      justify-content: center;
      border-bottom: .5rem solid var(--theme-accent);
      border-top: .3rem solid var(--theme-black);
    }
  `;

  protected render() {
    return html` <p>Hello World from LitElement!</p> `;
  }
}
