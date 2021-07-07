// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Global service for managing theme related operations for the app.
 */

import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Theme } from '../enums/global.enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme: Theme = Theme.DARK;
  private _themeChangedSource = new Subject<Theme>();

  constructor() {}

  // getter for current theme
  public get theme(): Theme {
    return this._theme;
  }

  public subscribeOnThemeChange(cb: (next: Theme) => void): Subscription {
    return this._themeChangedSource.subscribe(cb);
  }

  // executed by header component
  // toggles the current theme
  // publishes theme change events to entire app
  public toggleTheme() {
    this._theme = this._theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this._themeChangedSource.next(this._theme);
  }
}
