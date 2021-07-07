// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/core/enums/global.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  private _theme: Theme;
  private _themeSubscription!: Subscription;

  @Output() toggleDrawer = new EventEmitter<void>();

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

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  isDarkModeActivated() {
    return this._theme === Theme.DARK;
  }
}
