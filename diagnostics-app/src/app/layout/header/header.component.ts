// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import { Component, OnDestroy } from '@angular/core';
import { Theme } from 'src/app/core/enums/global.enums';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  private _theme: Theme;
  private _themeSubscription!: Subscription;

  get theme() {
    return this._theme;
  }

  constructor(private _themeService: ThemeService) {
    this._theme = this._themeService.theme;
    this._themeSubscription = this._themeService.subscribeOnThemeChange(
      (newTheme: Theme) => {
        this._theme = newTheme;
      }
    );
  }

  ngOnDestroy() {
    this._themeSubscription.unsubscribe();
  }

  onToggleTheme() {
    this._themeService.toggleTheme();
  }

  isDarkModeActivated() {
    return this._theme === Theme.DARK;
  }
}
