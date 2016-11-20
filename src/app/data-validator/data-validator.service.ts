import { Injectable } from '@angular/core';
import { IData } from './../model/data.model';

@Injectable()
export class DataValidatorService {

  constructor() { }

  validate(data: Array<IData>) {
    return this.endBalanceCheck(data);
  }

  endBalanceCheck(data: Array<IData>): Array<IData> {
    let invalidEndBalanceData = [];
    data.forEach((row) => {
      if(row['Start Balance']) {
        let startBalance = +row['Start Balance'];
        let mutation = +row.Mutation;
        let endBalance = +(startBalance + mutation).toFixed(2);
        
        if(endBalance !== +row['End Balance']) {
          invalidEndBalanceData.push(row);
        }

      }
    });
    return invalidEndBalanceData;
  }

  duplicateReferenceCheck(data: Array<IData>): Array<IData> {
    let sortedData = this.sortByReference(data);
    let duplicateReferenceData = [];
    sortedData.reduce((prev, curr) => {
      if(prev.Reference === curr.Reference) {
        duplicateReferenceData.push(curr);
      }
      return curr;
    });
    return duplicateReferenceData;
  }

  sortByReference(data: Array<IData>): Array<IData> {
    return data.sort((prev, curr) => {
      if(prev.Reference > curr.Reference ) {
        return 1;
      }

      if(prev.Reference < curr.Reference ) {
        return -1;
      }

      return 0;
    });
  }

}
