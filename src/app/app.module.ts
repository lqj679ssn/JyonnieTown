import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppPage } from './app.page';
import {AppItemComponent} from '../component/appItem.component';
import {AppDepotService} from '../service/appDepot.service';
import {ApiService} from '../service/api.service';
import {RequestService} from '../service/request.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppPage,
    AppItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AppDepotService,
    RequestService,
    ApiService,
  ],
  bootstrap: [AppPage]
})
export class AppModule { }
