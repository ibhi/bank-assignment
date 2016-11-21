/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IData } from './../model/data.model';
import { DataTableComponent } from './data-table.component';

describe('Component: DataTable', () => {
  let comp: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let de: DebugElement;
  let table: HTMLElement;

  let mockData: Array<IData> = [{
    reference: 137243,
    accountNumber: 'NL93ABNA0585619023',
    description: 'Candy from Rik King',
    startBalance: 13.33,
    mutation: +38.58,
    endBalance: 51.91
  }, {
    reference: 112806,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Candy for Vincent King',
    startBalance: 16.91,
    mutation: -38.13,
    endBalance: -21.22
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent]
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    comp.tableData = mockData;

    fixture.detectChanges();
    table = fixture.debugElement.query(By.css('table.table')).nativeElement;
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should have a html table', () => {
    expect(table).toBeTruthy();
  });

  it('should have 6 table header cells', () => {
    expect(table.querySelectorAll('thead>tr>th').length).toEqual(6);
  });

  it('should have ' + mockData.length + 'table body rows', () => {
    expect(table.querySelectorAll('tbody>tr').length).toEqual(mockData.length);
  });

  it('should have 6 table body cells', () => {
    expect(table.querySelectorAll('tbody>tr:first-child>td').length).toEqual(6);
  });

});

