import { Injectable } from '@angular/core';
import { dataHeaders } from '.././csv-parser/data-headers';
import { isEqual } from '.././csv-parser/is-equal';
let X2JS = require('x2js');

@Injectable()
export class XmlParserService {

  constructor() { }

  parse(xml) {
    let x2js = new X2JS({attributePrefix: ''});
    let data = x2js.xml2js(xml);
    let headerMap = dataHeaders();
    let expectedHeader = this.sort(Object.keys(headerMap));
    if (data) {
      let headerRow = this.sort(Object.keys(data.records.record[0]));
      if (!(isEqual(headerRow, expectedHeader))) {
        throw new Error('Invalid/Incorrect xml file format');
      }
      return data.records.record;
    }
    return [];
  }

  private sort(array: Array<any>) {
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
