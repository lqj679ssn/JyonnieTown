import {Component, Input} from '@angular/core';
import {App} from '../model/app';

@Component({
  selector: 'app-item',
  templateUrl: './appItem.component.html',
  styleUrls: ['./appItem.component.less'],
})
export class AppItemComponent {
  @Input() app: App;

  constructor() {
  }
}
