import { Component, Input } from '@angular/core';
import { IData } from './../model/data.model';
import { dataHeaders } from './../csv-parser/data-headers';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() tableData: Array<IData>;
  keys = Object.keys(dataHeaders());
  headers = this.keys.map(key => dataHeaders()[key]);

  constructor() { }

}
