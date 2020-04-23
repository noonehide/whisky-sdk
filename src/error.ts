
import {on, off} from './utils/brower'

export default class GlobalError {
  public handleErrorEvent (event: Event) {
    console.log('handleErrorEvent', event)
  }

  public handleRejectionEvent (event: Event) {
    console.log('handleRejectionEvent', event)
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
