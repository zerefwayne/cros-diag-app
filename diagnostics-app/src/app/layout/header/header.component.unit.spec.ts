// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit Tests for header.component
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Theme } from 'src/app/core/enums/global.enums';

import { HeaderComponent } from './header.component';

describe('unit: component: header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.theme).toBe(Theme.DARK);
  });

  it('isDarkModeActivated() returns correct dark mode status', () => {
    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme')
    ).nativeElement;
    expect(component.isDarkModeActivated()).toBeTrue();
    button.click();
    fixture.detectChanges();
    expect(component.isDarkModeActivated()).toBeFalse();
  });

  it('calls onToggleTheme on button click', () => {
    spyOn(component, 'onToggleTheme');
    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme')
    ).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.onToggleTheme).toHaveBeenCalled();
  });

  it('should emit event on btnToggleDrawer click', () => {
    spyOn(component.toggleDrawer, 'emit');
    spyOn(component, 'onToggleDrawer').and.callThrough();

    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleDrawer')
    ).nativeElement;

    button.click();
    expect(component.onToggleDrawer).toHaveBeenCalled();
    expect(component.toggleDrawer.emit).toHaveBeenCalled();
  });

  it('renders correct theme icon', () => {
    // default theme is dark, should display light_mode icon
    let iconEl: HTMLElement = fixture.debugElement.query(
      By.css('#iconTheme')
    ).nativeElement;
    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme')
    ).nativeElement;
    // It renders on DOM as <mat-icon>light_mode</mat-icon>
    expect(iconEl.textContent).toBe('light_mode');
    // trigger theme toggle
    button.click();
    fixture.detectChanges();
    // update the handle
    iconEl = fixture.debugElement.query(By.css('#iconTheme')).nativeElement;
    expect(iconEl.textContent).toBe('dark_mode');
  });
});
