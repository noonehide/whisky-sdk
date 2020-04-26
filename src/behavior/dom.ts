import { Type } from '../const'
import { htmlTreeAsString } from '../utils/brower'
import WhiskySDK from '../whisky-sdk';
const _document = document

/**
 *  监听用户行为: Dom点击,仅用作事件回顾
 */
export default class Dom {
  _lastCapturedEvent: Event | null;
  _keypressTimeout: any;

  constructor() {
    this._lastCapturedEvent = null
    this._keypressTimeout = null
  }

  public active() {
    if (_document.addEventListener) {
      console.log('addEventListener')
      _document.addEventListener('click', (event: Event) => {
        this._breadcrumbEventHandler(Type.DomClick, event)
      }, false);
      _document.addEventListener('keypress', (event: Event) => { this._keypressEventHandler(event) });
    } else if (_document.attachEvent) {
      // IE8 Compatibility
      _document.attachEvent('onclick', (event: Event) => { this._breadcrumbEventHandler(Type.DomClick, event) }, false);
      _document.attachEvent('onkeypress', (event: Event) => { this._keypressEventHandler(event) });
    }
  }

  public _breadcrumbEventHandler(type: string, event: Event) {
    if (this._lastCapturedEvent === event) {
      return
    }
    this._lastCapturedEvent = event;
    let target;
    try {
      target = htmlTreeAsString(event.target);
    } catch (e) {
      target = '<unknown>';
    }
    WhiskySDK.sendMessage(type, target)

  }

  public _keypressEventHandler(event: any) {
    if (this._lastCapturedEvent === event) return;
    this._lastCapturedEvent = event;

    let target;
    let debounceDuration = 1000
    debugger
    try {
      target = event.target;
    } catch (e) {
      return;
    }

    let tagName = target && target.tagName;
    if (
      !tagName ||
      (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
    ) {
      return;
    }

    // record first keypress in a series, but ignore subsequent
    // keypresses until debounce clears
    let timeout = this._keypressTimeout;
    if (!timeout) {
      this._breadcrumbEventHandler(Type.DomInput, event);
    }
    clearTimeout(timeout);
    this._keypressTimeout = setTimeout(() => {
      this._keypressTimeout = null
    }, debounceDuration);
  }
}
