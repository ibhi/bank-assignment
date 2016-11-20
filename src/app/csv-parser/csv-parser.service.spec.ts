/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CsvParserService } from './csv-parser.service';

describe('Service: CsvParser', () => {
  let mockData = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
                  137243,NL93ABNA0585619023,Candy from Rik King,13.33,+38.58,51.91
                  112806,NL90ABNA0585647886,Candy for Vincent King,16.91,-38.13,-21.22
                  118455,NL46ABNA0625805417,Clothes for Rik de Vries,18.08,+26.08,44.16
                  168541,NL43AEGO0773393871,Flowers from Jan Theu�,81.2,-49.38,31.82
                  112806,NL32RABO0195610843,Clothes for Peter King,14.84,+34.32,49.16
                  112806,NL93ABNA0585619023,Flowers for Willem Bakker,89.66,-35.54,54.12
                  159854,NL56RABO0149876948,Tickets from Peter Dekker,56.42,-31.99,24.43
                  153928,NL91RABO0315273637,Clothes for Jan Theu�,79.52,+41.24,120.76
                  133575,NL93ABNA0585619023,Candy for Jan Theu�,109.04,+40.16,149.2
                  186393,NL74ABNA0248990274,Flowers for Willem Bakker,30.4,+43.18,73.58`;
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
  }, {
    reference: '118455',
    accountNumber: 'NL46ABNA0625805417',
    description: 'Clothes for Rik de Vries',
    startBalance: '18.08',
    mutation: '+26.08',
    endBalance: '44.16'
  }, {
    reference: '168541',
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Jan Theu�',
    startBalance: '81.2',
    mutation: '-49.38',
    endBalance: '31.82'
  }, {
    
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvParserService]
    });
  });

  it('should create an instance', inject([CsvParserService], (service: CsvParserService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse the provided csv', inject([CsvParserService], (service: CsvParserService) => {
    service.parse(mockData)
  }));

});
