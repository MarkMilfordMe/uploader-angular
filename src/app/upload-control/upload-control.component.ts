import { Component, OnInit, Input } from '@angular/core';
import {StorageService} from '../StorageService';

@Component({
  selector: 'app-upload-control',
  templateUrl: './upload-control.component.html',
  styleUrls: ['./upload-control.component.css']
})
export class UploadControlComponent implements OnInit {
  @Input() maxSize : integer;
  @Input() supportedTypes: string;

  constructor(private _storageService: StorageService) { }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
     if (fileInput.target.files && fileInput.target.files[0]) {
        var file = fileInput.target.files[0];
        if(this.maxSize < file.size) {
          alert("Sorry we only accept files up to " + this.maxSize + " bytes");
          return;
        }
        var types = this.supportedTypes.split(",");
        if(types.filter(g=> file.name.endsWith(g)).length == 0) {
          alert("Sorry we don't allow this file type");
          return;
        }
        this._storageService.addItem(file.size, file.name, file.lastModifiedDate, "You");
        fileInput.target.value = ''; // Clear file once processed
    }
  }



}
