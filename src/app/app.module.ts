import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StorageService} from './StorageService';
import { AppComponent } from './app.component';
import { UploadControlComponent } from './upload-control/upload-control.component';
import { FileListControlComponent } from './file-list-control/file-list-control.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UploadControlComponent,
    FileListControlComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
