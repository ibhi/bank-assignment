import { Injectable } from '@angular/core';
import { IData } from './../model/data.model';

@Injectable()
export class DataValidatorService {

  constructor() { }

  validate(data: Array<IData>) {
    return {
      duplicateReference: this.duplicateReferenceCheck(data),
      invalidEndBalance: this.endBalanceCheck(data)
    };
  }

  endBalanceCheck(data: Array<IData>): Array<IData> {
    let invalidEndBalanceData: Array<IData> = [];
    data.forEach((row) => {
      if (row.startBalance && row.endBalance && row.mutation) {
        let startBalance = +row.startBalance;
        let mutation = +row.mutation;
        let endBalance = +(startBalance + mutation).toFixed(2);

        if (endBalance !== +row.endBalance) {
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
      if (prev.reference === curr.reference) {
        duplicateReferenceData.push(curr);
      }
      return curr;
    });
    return duplicateReferenceData;
  }

  private sortByReference(data: Array<IData>): Array<IData> {
    return data.sort((prev, curr) => {
      if (prev.reference > curr.reference ) {
        return 1;
      }

      if (prev.reference < curr.reference ) {
        return -1;
      }

      return 0;
    });
  }

}
