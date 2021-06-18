// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Dashboard Component.
 * This is the root layout component which holds the dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnInit } from '@angular/core';

import '../../webcomponents/sample/sample-el.lit';
import '../../webcomponents/sample/graph-element.lit';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  per: number = 50;
  time: number = 100;
  normalData: { value: number; tag: string }[] = [
    { value: 2, tag: 'Netflix' },
    { value: 5, tag: 'Comida' },
    { value: 8, tag: 'Alquiler' },
    { value: 2, tag: 'Gasolina' },
    { value: 5, tag: 'Ropa' },
  ];
  data: string = '[]';
  constructor() {}

  ngOnInit(): void {
    let interval = setInterval(() => {
      const idx = Math.floor(Math.random()*5);
      this.normalData[idx].value++;
      this.data = JSON.stringify(this.normalData);
    }, 500);
  }
}
