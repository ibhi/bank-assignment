/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataValidatorService } from './data-validator.service';
import { IData } from './../model/data.model';

describe('Service: DataValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataValidatorService]
    });
  });

  it('should get an instance of this', inject([DataValidatorService], (service: DataValidatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should check for end balance and return invalid row data', inject([DataValidatorService], (service: DataValidatorService) => {
    let mockData: Array<IData> = [{
      reference: 137243,
      accountNumber: 'NL93ABNA0585619023',
      description: 'Candy from Rik King',
      startBalance: 13.33,
      mutation: +38.58,
      endBalance: 51.92
    }, {
      reference: 112806,
      accountNumber: 'NL90ABNA0585647886',
      description: 'Candy for Vincent King',
      startBalance: 16.91,
      mutation: -38.13,
      endBalance: -2
    }];
    expect(service.endBalanceCheck(mockData)).toEqual(mockData);
  }));

  it('should check for duplicate reference number rows and return it', inject([DataValidatorService], (service: DataValidatorService) => {
    let mockData: Array<IData> = [{
      reference: 112806,
      accountNumber: 'NL90ABNA0585647886',
      description: 'Candy for Vincent King',
      startBalance: 16.91,
      mutation: -38.13,
      endBalance: -21.22
    }, {
      reference: 112806,
      accountNumber: 'NL32RABO0195610843',
      description: 'Clothes for Peter King',
      startBalance: 14.84,
      mutation: +34.32,
      endBalance: 49.16
    }];
    expect(service.duplicateReferenceCheck(mockData)).toEqual([mockData[1]]);
  }));

  it('should check for duplicate reference and invalid end balance rows and return them',
    inject([DataValidatorService], (service: DataValidatorService) => {

    let mockData: Array<IData> = [{
      reference: 112806,
      accountNumber: 'NL90ABNA0585647886',
      description: 'Candy for Vincent King',
      startBalance: 16.91,
      mutation: -38.13,
      endBalance: -21.22
    }, {
      reference: 112806,
      accountNumber: 'NL32RABO0195610843',
      description: 'Clothes for Peter King',
      startBalance: 14.84,
      mutation: +34.32,
      endBalance: -49.16
    }, {
      reference: 159854,
      accountNumber: 'NL56RABO0149876948',
      description: 'Tickets from Peter Dekker',
      startBalance: 56.42,
      mutation: -31.99,
      endBalance: 24.43
    }];

    let expectedData = {
      duplicateReference: [mockData[1]],
      invalidEndBalance: [mockData[1]]
    };
    expect(service.validate(mockData)).toEqual(expectedData);
  }));

  it('should return an empty array when any one of startBalance or endBalance or mutation is null or undefined',
    inject([DataValidatorService], (service: DataValidatorService) => {

    let mockData: Array<IData> = [{
      reference: 112806,
      accountNumber: 'NL90ABNA0585647886',
      description: 'Candy for Vincent King',
      startBalance: null,
      mutation: -38.13,
      endBalance: -21.22
    }, {
      reference: 112806,
      accountNumber: 'NL32RABO0195610843',
      description: 'Clothes for Peter King',
      startBalance: 14.84,
      mutation: undefined,
      endBalance: -49.16
    }, {
      reference: 159854,
      accountNumber: 'NL56RABO0149876948',
      description: 'Tickets from Peter Dekker',
      startBalance: 56.42,
      mutation: -31.99,
      endBalance: null
    }];

    expect(service.endBalanceCheck(mockData)).toEqual([]);
  }));

});
