
import { on, off } from '../utils/brower'
import { Type } from '../const'
import Sender from '../sender'

export default class GlobalError {

  options: IWhiskyConfig;

  constructor(options: IWhiskyConfig) {
    this.options = options
  }

  handleErrorEvent = (event: ErrorEvent) => {
    console.log('handleErrorEvent', this)
    Sender.getInstance().push(Type.Error, {
      event: {
        type: Type.Error,
        url: window.location.href,
        title: window.document.title,
        params: {
          filename: event.filename,
          message: event.message, //  "Uncaught TypeError: "a".size is not a function"
          lineno: event.lineno,
          colno: event.colno,
          error: event.error // {"message": ""a".size is not a function", "stack":  "TypeError: "a".size is not a function↵    at file:///Users/jianghui/Code/my_code/whisky-sdk/test.html:63:15"}
        }
      },
    }, this.options)
  }

  handleRejectionEvent = (event: PromiseRejectionEvent) => {
    Sender.getInstance().push(Type.UnhandledRejection, {
      event: {
        type: Type.UnhandledRejection,
        url: window.location.href,
        title: window.document.title,
        params: {
          error: event.reason // {message: "promise error", stack: "Error: promise error↵    at file:///Users/jianghui/Code/my_code/whisky-sdk/test.html:60:12↵    at new Promise (<anonymous>)↵    at file:///Users/jianghui/Code/my_code/whisky-sdk/test.html:59:3"}
        }
      }
    }, this.options)
  }

  public active() {
    on(window, 'error', this.handleErrorEvent, true)
    on(window, 'unhandledrejection', this.handleRejectionEvent, true)
  }

  public inActive() {
    off(window, 'error', this.handleErrorEvent, true)
    off(window, 'unhandledrejection', this.handleRejectionEvent, true)
  }
}
