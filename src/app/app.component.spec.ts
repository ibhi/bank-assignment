/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FileReaderComponent } from './file-reader/file-reader.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CsvParserService } from './csv-parser/csv-parser.service';
import { DataValidatorService } from './data-validator/data-validator.service';
import { IData } from './model/data.model';

describe('Component: AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  let mockData = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
137243,NL93ABNA0585619023,Candy from Rik King,13.33,+38.58,51.91
112806,NL90ABNA0585647886,Candy for Vincent King,16.91,-38.13,-21.22`;

  let mockParsedData = [{
    reference: '137243',
    accountNumber: 'NL93ABNA0585619023',
    description: 'Candy from Rik King',
    startBalance: '13.33',
    mutation: '+38.58',
    endBalance: '51.91'
  }, {
    reference: '112806',
    accountNumber: 'NL90ABNA0585647886',
    description: 'Candy for Vincent King',
    startBalance: '16.91',
    mutation: '-38.13',
    endBalance: '-21.22'
  }];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FileReaderComponent,
        DataTableComponent,
      ],
      providers: [
        CsvParserService,
        DataValidatorService,
      ]
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
    element = fixture.debugElement.nativeElement;
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should assign data', async(() => {
    let fileReader = de.query(By.directive(FileReaderComponent)).componentInstance;
    fileReader.onData.emit({ result: mockData , type: 'text/csv'});
    expect(comp.data).toEqual(mockParsedData);
  }));

  it('should validate the assigned data', async(() => {
    let mockParsedData1: Array<IData> = [{
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

    comp.data = mockParsedData1;
    comp.validate();

    expect(comp.validatedResults.duplicateReference).toEqual([]);
    expect(comp.validatedResults.invalidEndBalance).toEqual([]);

  }));

  it('should not validate if the assigned data is null or undefined', async(() => {
    comp.validate();
    expect(comp.validatedResults).toBeUndefined();
  }));

  it('should not validate if the assigned data is empty array', async(() => {
    comp.data = [];
    comp.validate();
    expect(comp.validatedResults).toBeUndefined();
  }));

});
