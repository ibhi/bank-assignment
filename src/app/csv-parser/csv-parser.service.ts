import { Injectable } from '@angular/core';
import { IData } from './../model/data.model';
import { dataHeaders } from './data-headers';
import { isEqual } from './is-equal';
@Injectable()
export class CsvParserService {

  constructor() { }

  parse(csv) {
    let rows = csv.split(/\r\n|\n/);
    // Remove the headers row
    let headerRow = this.sort(rows.shift().split(','));
    let headerMap = dataHeaders();
    let expectedHeader = this.sort(Object.keys(headerMap).map(key => headerMap[key]));

    if (!(isEqual(headerRow, expectedHeader))) {
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

    return data;
  }

  private sort(array) {
    return array.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
}
