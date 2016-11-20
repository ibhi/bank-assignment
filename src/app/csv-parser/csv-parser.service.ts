import { Injectable } from '@angular/core';
import { IData } from './../model/data.model';
import { dataHeaders } from './data-headers';

@Injectable()
export class CsvParserService {

  constructor() { }

  parse(csv) {
    let rows = csv.split(/\r\n|\n/);
    // Remove the headers row
    rows.shift();
    // let headers = rows.shift().split(',');
    let headers = Object.keys(dataHeaders());
    let data: Array<IData> = [];

    rows.forEach((row, rowIndex) => {
        let cells = row.split(',');
        let cellData: IData = <IData>{};
        cells.forEach((cell, cellIndex) => {
          cellData[headers[cellIndex]] = cell;
        });
        data.push(cellData);
    });
    console.log(data);
    return data;
  }
}
