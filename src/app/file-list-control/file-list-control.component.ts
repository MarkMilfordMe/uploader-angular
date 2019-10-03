import { Component, OnInit } from '@angular/core';
import {StorageService} from '../StorageService';

@Component({
  selector: 'app-file-list-control',
  templateUrl: './file-list-control.component.html',
  styleUrls: ['./file-list-control.component.css']
})
export class FileListControlComponent implements OnInit {

	types: [];
	
  constructor(private _storageService: StorageService) {
    _storageService.Subscription.subscribe({
      next: (v) => this.loadRecords(v)
    });
  }

  ngOnInit() {
		// get list of active record types
	this.loadRecords(this._storageService.getExistingItems());
  }
  loadRecords(v) {
	  this.types = 
		v.map(x=>
			x.name.substring(x.name.lastIndexOf('.')+1, x.name.length))
			.filter((sv, i, self) => self.indexOf(sv) === i)
			.map(x=> ({
				name: x, 
				records: v.filter(g=> g.name.endsWith(x))
			}));
	
  }
  clearList() {
    this._storageService.clear();
  }



}

