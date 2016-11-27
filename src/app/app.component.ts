import { Component } from '@angular/core';
import { CsvParserService } from './csv-parser/csv-parser.service';
import { DataValidatorService } from './data-validator/data-validator.service';
import { XmlParserService } from './xml-parser/xml-parser.service';
import { IData } from './model/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CsvParserService, XmlParserService, DataValidatorService]
})
export class AppComponent {
  brandName = 'Rabo Bank';
  data: Array<IData>;
  validatedResults: { duplicateReference: Array<IData>, invalidEndBalance: Array<IData> };

  constructor(private csvParser: CsvParserService, private xmlParser: XmlParserService, private dataValidator: DataValidatorService) {
  }

  onData(e) {
    this.data = undefined;
    this.validatedResults = undefined;
    try {
      if (e.type === 'text/csv') {
        this.data = this.csvParser.parse(e.result);
      }
      if (e.type === 'text/xml') {
        this.data = this.xmlParser.parse(e.result);
        console.log(JSON.stringify(this.data));
      }
    } catch (e) {
      alert('Invalid/Incorrect csv file');
    }
  }

  validate() {
    if (this.data) {
      if (this.data.length > 0) {
        this.validatedResults = this.dataValidator.validate(this.data);
      }
    }
  }

}
