/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FileReaderComponent } from './file-reader.component';

describe('Component: FileReader', () => {
  it('should create an instance', () => {
    let component = new FileReaderComponent();
    expect(component).toBeTruthy();
  });

  it('should handle file select', () => {
    let component = new FileReaderComponent();
    let csv = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
137243,NL93ABNA0585619023,Candy from Rik King,13.33,+38.58,51.91
112806,NL90ABNA0585647886,Candy for Vincent King,16.91,-38.13,-21.22`;
    let event = {
      target: {
        files: [new Blob([csv], {type: 'text/csv'})]
      }
    };
    component.handleFileSelect(event);

    component.onData.subscribe((data) => {
      expect(data).toEqual(csv);
    });

  });

  it('should not handle file select if the file type is not csv', () => {
    let component = new FileReaderComponent();
    let event = {
      target: {
        files: [new Blob([], {type: 'application/json'})]
      }
    };
    component.handleFileSelect(event);

    component.onData.subscribe((data) => {
      expect(data).toEqual('');
    });

  });

});
