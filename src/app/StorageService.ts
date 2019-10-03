import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs";
import {Subject} from "rxjs";

@Injectable()
export class StorageService implements OnDestroy {

  public Subscription = new Subject<[]>();

  private key = "FILES";

  constructor(private http: HttpClient) {
    this.http.get<any[]>("https://localhost:44322/api/files")
    .subscribe(resp => {
      window.localStorage.setItem(this.key, JSON.stringify(resp));
      this.Subscription.next(resp);
    });
  }

  ngOnDestroy() {
    this.clear();
  }

  public getExistingItems() {
    if(window.localStorage.getItem(this.key)) {
      return JSON.parse(window.localStorage.getItem(this.key));
    }
    return [];
  }
  public addItem(size, name, date, user) {
    var items = this.getExistingItems();
	var item = new FileItem(size, name, date, user);
    items.push(item);
	this.http.put<FileItem>("https://localhost:44322/api/files", item).subscribe(resp => {
		window.localStorage.setItem(this.key, JSON.stringify(resp));
		this.Subscription.next(resp);
	});
  }
}

export class FileItem {
  size: number;
  name: string;
  date: string;
  user: string;

  constructor(size, name, date, user) {
    this.size = size;
    this.name = name;
    this.date = date;
    this.user = user;
  }
}
