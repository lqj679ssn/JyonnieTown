class CallbackFunction {
  private readonly _function: any;

  constructor(f) {
    this._function = f;
  }

  static handler(...any) {}

  get isFunction() {
    return typeof this._function === 'function';
  }

  get run() {
    if (this.isFunction) {
      return this._function;
    } else {
      return CallbackFunction.handler;
    }
  }
}

export class HttpCallback {
  uploadProgress: CallbackFunction;
  downloadProgress: CallbackFunction;
  responseCallback: CallbackFunction;
  failResponseCallback: CallbackFunction;

  constructor({uploadProgress = null, downloadProgress = null, responseCallback = null, failResponseCallback = null}) {
    this.uploadProgress = new CallbackFunction(uploadProgress);
    this.downloadProgress = new CallbackFunction(downloadProgress);
    this.responseCallback = new CallbackFunction(responseCallback);
    this.failResponseCallback = new CallbackFunction(failResponseCallback);
  }
}
