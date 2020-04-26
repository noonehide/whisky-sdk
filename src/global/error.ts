
import {on, off} from '../utils/brower'
import WhiskySDK from '../whisky-sdk'
import {Type} from '../const'
export default class GlobalError {
  public handleErrorEvent (event: ErrorEvent) {
    WhiskySDK.sendMessage(Type.Error, {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    })
  }

  public handleRejectionEvent (event: PromiseRejectionEvent) {
    WhiskySDK.sendMessage(Type.UnhandledRejection, {
      promise: event.promise,
      reason: event.reason
    })
  }

  public active() {
    on(window , 'error', this.handleErrorEvent, true)
    on(window, 'unhandledrejection', this.handleRejectionEvent, true)
  }

  public inActive () {
    off(window , 'error', this.handleErrorEvent, true)
    off(window , 'unhandledrejection', this.handleRejectionEvent, true)
  }
}
