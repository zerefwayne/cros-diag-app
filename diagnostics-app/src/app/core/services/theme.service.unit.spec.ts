// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit Tests for theme.service
 */

import { TestBed } from '@angular/core/testing';
import { Theme } from '../enums/global.enums';

import { ThemeService } from './theme.service';

describe('unit: service: theme', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // default mode
    expect(service.theme).toBe(Theme.DARK);
  });

  it('should switch from dark to light', () => {
    let subscription = service.subscribeOnThemeChange((next: Theme) => {
      expect(next).toBe(Theme.LIGHT);
    });
    service.toggleTheme();
    expect(service.theme).toBe(Theme.LIGHT);
    subscription.unsubscribe();
  });

  it('should switch from dark to light', () => {
    // switch from dark to light before subscribing
    service.toggleTheme();
    let subscription = service.subscribeOnThemeChange((next: Theme) => {
      expect(next).toBe(Theme.DARK);
    });
    service.toggleTheme();
    expect(service.theme).toBe(Theme.DARK);
    subscription.unsubscribe();
  });
});
