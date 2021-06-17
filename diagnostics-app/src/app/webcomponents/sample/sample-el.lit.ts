// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sample-el')
export class SampleElement extends LitElement {
  render() {
    return html`<p>Hello, Aayush!</p>`;
  }
}
