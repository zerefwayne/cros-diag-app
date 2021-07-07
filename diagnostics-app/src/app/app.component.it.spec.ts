// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Integration Tests for app.component
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Theme } from './core/enums/global.enums';
import { ThemeService } from './core/services/theme.service';

describe('integration: component: app', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ThemeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    themeService = TestBed.inject(ThemeService);
  });

  it('set cssClass on receiving update from themeService', () => {
    // subscribe to changes from themeService
    // expect statements will run on receiving toggleUpdates
    let subscription = themeService.subscribeOnThemeChange((next: Theme) => {
      expect(next).toBe(Theme.LIGHT);
    });
    // trigger manually to simulate toggleTheme method from some component
    themeService.toggleTheme();
    fixture.detectChanges();
    // class should change to light
    expect(component.cssClass).toBe(Theme.LIGHT);
    subscription.unsubscribe();
  });
});
