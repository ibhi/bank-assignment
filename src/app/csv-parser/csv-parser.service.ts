import { Injectable } from '@angular/core';
import { IData } from './../model/data.model';
import { dataHeaders } from './data-headers';

@Injectable()
export class CsvParserService {

  constructor() { }

  parse(csv) {
    let rows = csv.split(/\r\n|\n/);
    // Remove the headers row
    let headerRow = rows.shift().split(',');
    let headerMap = dataHeaders();
    let expectedHeader = Object.keys(headerMap).map(key => headerMap[key]);
    console.log(headerRow, expectedHeader);
    if (!(this.isEqual(headerRow, expectedHeader))) {
      throw new Error('Invalid/Incorrect csv file format');
    }
    // let headers = rows.shift().split(',');
    let headers = Object.keys(headerMap);
    let data: Array<IData> = [];

    rows.forEach((row, rowIndex) => {
        let cells = row.split(',');
        let cellData: IData = <IData>{};
        if (cells.length === headers.length) {
          cells.forEach((cell, cellIndex) => {
            cellData[headers[cellIndex]] = cell;
          });
          data.push(cellData);
        }
    });
    console.log(data);
    return data;
  }

  private isEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (a == null || b == null) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
