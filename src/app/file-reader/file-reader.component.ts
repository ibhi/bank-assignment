import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {
  @Output() onData: EventEmitter<string> = new EventEmitter();

  constructor() { }

  handleFileSelect(event) {

    const file: File = event.target.files[0];

    if ( file.type === 'text/csv' || file.type === 'text/xml' ) {
      const reader: FileReader = new FileReader();

      reader.onload = () => {
        console.log(reader.result);
        this.onData.emit(reader.result);
      };

      reader.readAsText(file);
    }

  }

}
