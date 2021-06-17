// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sample-el')
export class SampleElement extends LitElement {
  @property({ type: Number })
  percentage_remaining: number = 100;

  @property({ type: Number })
  time_remaining: number = 223;

  private generate_time_string = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    if (hours === 0) {
      return `${minutes} minutes remaining`;
    }
    return `${hours} hours, ${minutes} minutes remaining`;
  };

  static styles = css`
    * {
      box-sizing: border-box;
      color: white;
    }
    .element-container {
      min-height: 100px;
      padding: 1.3rem 1.6rem;
      background-color: #232323;
    }
    header {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    .percentage {
      margin-bottom: 1rem;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      width: 100%;
      padding: 5px;
      background-color: #21a464;
      border-radius: 4px;
    }
    .time {
      font-size: 16px;
      font-weight: 500;
      text-align: right;
      padding-right: 3px;
    }
  `;
  render() {
    return html`
      <div class="element-container">
        <header>Battery</header>
        <div class="percentage">${this.percentage_remaining}%</div>
        <div class="time">
          ${this.generate_time_string(this.time_remaining)}
        </div>
      </div>
    `;
  }
}
