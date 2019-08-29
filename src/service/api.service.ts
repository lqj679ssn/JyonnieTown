import {Injectable} from '@angular/core';
import {Url} from '../model/url';
import {HttpCallback} from '../model/httpCallback';
import {RequestService} from './request.service';

@Injectable()
export class ApiService {
  tool: any;

  constructor(
    private request: RequestService,
  ) {
    this.tool = Url('https://tools.6-79.cn/v1');
  }

  getPinyin({text}, callback: HttpCallback) {
    return this.request.post({
      url: this.tool('/language/character-to-pinyin'),
      data: {text: text},
      callback: callback,
    });
  }
}
