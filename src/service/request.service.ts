import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpCallback} from '../model/httpCallback';

@Injectable()
export class RequestService {
  constructor(
    private http: HttpClient,
  ) {}

  static customResponseHandler: any = null;

  static defaultResponseHandler(event: HttpResponse<any>, callback: HttpCallback) {
    const resp = event.body;
    if (resp.code !== 0) {
      callback.failResponseCallback.run(resp);
    } else {
      callback.responseCallback.run(resp.body);
    }
  }

  static setResponseHandler(handler: any) {
    RequestService.customResponseHandler = handler;
  }

  handler(o: Observable<object>, callback: HttpCallback) {
    o.subscribe((event: HttpEvent<any>) => {
      if ('ok' in event && !event.ok) {
        callback.failResponseCallback.run(event);
        return;
      }
      switch (event.type) {
        case HttpEventType.UploadProgress:
          callback.uploadProgress.run(event);
          break;
        case HttpEventType.DownloadProgress:
          callback.downloadProgress.run(event);
          break;
        case HttpEventType.Response:
          if (RequestService.customResponseHandler) {
            RequestService.customResponseHandler(event, callback);
          } else {
            RequestService.defaultResponseHandler(event, callback);
          }
          break;
        default:
          break;
      }
    });
  }

  req({method, url, callback, query = null, data = null, reportProgress = false}) {
    const httpHeaders = new HttpHeaders();
    const options = {
      headers: httpHeaders,
      params: query,
      reportProgress: reportProgress,
    };

    let r;
    if (['POST', 'PUT'].includes(method)) {
      r = new HttpRequest(method, url, data, options);
    } else {
      r = new HttpRequest(method, url, options);
    }
    return this.handler(this.http.request(r), callback);
  }

  get({url, callback, query = null, reportProgress = false}) {
    const param = arguments[0];
    param.method = 'GET';
    return this.req(param);
  }

  post({url, callback, query = null, data = null, reportProgress = false}) {
    const param = arguments[0];
    param.method = 'POST';
    return this.req(param);
  }

  put({url, callback, query = null, data = null, reportProgress = false}) {
    const param = arguments[0];
    param.method = 'PUT';
    return this.req(param);
  }

  delete({url, callback, query = null, reportProgress = false}) {
    const param = arguments[0];
    param.method = 'DELETE';
    return this.req(param);
  }
}
