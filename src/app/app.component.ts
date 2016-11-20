import { Component } from '@angular/core';
import { CsvParserService } from './csv-parser/csv-parser.service';
import { DataValidatorService } from './data-validator/data-validator.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CsvParserService, DataValidatorService]
})
export class AppComponent {
  title = 'app works!';
  constructor(private csvParser: CsvParserService, private dataValidator: DataValidatorService) {
  }
  onData(e) {
    console.log(e);
    console.log(this.dataValidator.validate(this.csvParser.parse(e)));
  }
}
