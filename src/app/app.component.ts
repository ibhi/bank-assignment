import { Component } from '@angular/core';
import { CsvParserService } from './csv-parser/csv-parser.service';
import { DataValidatorService } from './data-validator/data-validator.service';
import { IData } from './model/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CsvParserService, DataValidatorService]
})
export class AppComponent {
  brandName = 'Rabo Bank';
  data: Array<IData>;
  validatedResults: { duplicateReference: Array<IData>, invalidEndBalance: Array<IData> } ;

  constructor(private csvParser: CsvParserService, private dataValidator: DataValidatorService) {
  }

  onData(e) {
    console.log(e);
    this.data = this.csvParser.parse(e);
    console.log(this.dataValidator.validate(this.csvParser.parse(e)));
  }

  validate() {
    if (this.data) {
      this.validatedResults = this.dataValidator.validate(this.data);
    }
  }

}
