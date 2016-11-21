/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IData } from './../model/data.model';
import { NavbarComponent } from './navbar.component';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let ne: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    comp.brandName = 'Rabo Bank';

    fixture.detectChanges();
    ne = fixture.debugElement.nativeElement;
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should have proper brand name', () => {
    expect(ne.querySelector('.navbar-brand').textContent).toBe('Rabo Bank');
  });

});
