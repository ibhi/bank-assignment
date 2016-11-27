import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {
  @Output() onData: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  handleFileSelect(event) {

    const file: File = event.target.files[0];

    if ( file.type === 'text/csv' || file.type === 'text/xml' ) {
      const reader: FileReader = new FileReader();

      reader.onload = (e) => {
        this.onData.emit({ result: reader.result, type: file.type });
      };

      reader.readAsText(file);
    } else {
      alert('Please upload only csv or xml files of MT940 format');
      this.onData.emit('');
    }

  }

}
