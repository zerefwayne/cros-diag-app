// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Integration Tests for header.component
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Theme } from 'src/app/core/enums/global.enums';
import { ThemeService } from 'src/app/core/services/theme.service';

import { HeaderComponent } from './header.component';

describe('integration: component: header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [ThemeService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ThemeService);
  });

  it('should receive theme update from service on click', () => {
    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme')
    ).nativeElement;
    // subscribe to changes from themeService
    // expect statements will run on receiving toggleUpdates
    let subscription = service.subscribeOnThemeChange((next: Theme) => {
      expect(next).toBe(Theme.LIGHT);
    });
    // triggers the expect inside subscription
    button.click();
    fixture.detectChanges();
    subscription.unsubscribe();
  });
});
