/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { XmlParserService } from './xml-parser.service';

describe('XmlParserService', () => {
  let mockXml = `<records>
    <record reference='163585'>
      <accountNumber>NL90ABNA0585647886</accountNumber>
      <description>Candy for Vincent Bakker</description>
      <startBalance>32.01</startBalance>
      <mutation>+27.12</mutation>
      <endBalance>59.13</endBalance>
    </record>
    <record reference='175885'>
      <accountNumber>NL43AEGO0773393871</accountNumber>
      <description>Clothes for Richard de Vries</description>
      <startBalance>5429</startBalance>
      <mutation>-939</mutation>
      <endBalance>6368</endBalance>
    </record>
    <record reference='126297'>
      <accountNumber>NL93ABNA0585619023</accountNumber>
      <description>Candy for Vincent Dekker</description>
      <startBalance>105.24</startBalance>
      <mutation>-25.89</mutation>
      <endBalance>79.35</endBalance>
    </record>
  </records>`;

  let mockParsedData = [
    {
      'accountNumber': 'NL90ABNA0585647886',
      'description': 'Candy for Vincent Bakker',
      'startBalance': '32.01',
      'mutation': '+27.12',
      'endBalance': '59.13',
      'reference': '163585'
    },
    {
      'accountNumber': 'NL43AEGO0773393871',
      'description': 'Clothes for Richard de Vries',
      'startBalance': '5429',
      'mutation': '-939',
      'endBalance': '6368',
      'reference': '175885'
    },
    {
      'accountNumber': 'NL93ABNA0585619023',
      'description': 'Candy for Vincent Dekker',
      'startBalance': '105.24',
      'mutation': '-25.89',
      'endBalance': '79.35',
      'reference': '126297'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XmlParserService]
    });
  });

  it('should create an service instance', inject([XmlParserService], (service: XmlParserService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse the provided csv', inject([XmlParserService], (service: XmlParserService) => {
    expect(service.parse(mockXml)).toEqual(mockParsedData);
  }));

  it('should throw for wrong csv file format', inject([XmlParserService], (service: XmlParserService) => {
    let mockInvalidData = `<records>
      <record reference='163585'>
        <acc>NL90ABNA0585647886</acc>
        <description>Candy for Vincent Bakker</description>
        <startBalance>32.01</startBalance>
        <mutation>+27.12</mutation>
        <endBalance>59.13</endBalance>
      </record>
      <record reference='175885'>
        <acc>NL43AEGO0773393871</acc>
        <description>Clothes for Richard de Vries</description>
        <startBalance>5429</startBalance>
        <mutation>-939</mutation>
        <endBalance>6368</endBalance>
      </record>
    </records>`;
    // console.log(service.parse(mockInvalidData));
    expect(() => service.parse(mockInvalidData)).toThrow(new Error('Invalid/Incorrect xml file format'));
  }));
});
