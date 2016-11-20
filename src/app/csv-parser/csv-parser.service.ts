import { Injectable } from '@angular/core';

@Injectable()
export class CsvParserService {

  constructor() { }

  parse(csv) {
    let rows = csv.split(/\r\n|\n/);
    let headers = rows.shift().split(',');
    let data = [];

    rows.forEach((row, rowIndex) => {
        let cells = row.split(',');
        let cellData = {};
        cells.forEach((cell, cellIndex) => {
          cellData[headers[cellIndex]] = cell;
        });
        data.push(cellData);
    });
    console.log(data);
    return data;
  }
}
