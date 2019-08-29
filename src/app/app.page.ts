import { Component } from '@angular/core';
import {AppDepotService} from '../service/appDepot.service';
import {App} from '../model/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.page.html',
  styleUrls: [
    './app.page.less',
    '../assets/font/fzcch/方正超粗黑.css',
    '../assets/font/fzskbxkjt/方正宋刻本秀楷简体.css',
    '../assets/font/hwfs/华文仿宋.css',
  ],
})
// tslint:disable-next-line:component-class-suffix
export class AppPage {
  selectedApp: App;

  constructor(
    public appDepot: AppDepotService,
  ) {
    this.selectedApp = null;
  }

  select(app: App) {
    this.selectedApp = app;
  }
}
