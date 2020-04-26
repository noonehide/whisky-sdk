import {parseUrl, emitEvent } from './utils/brower'

const _window = window
const _location = _window.location

export default class History {
  _lastHref: string;

  constructor () {
    this._lastHref = ''
  }

  public active() {
    emitEvent('pushState')
    emitEvent('replaceState')
    const _this = this
    // 首次加载需要手动触发
    window.addEventListener('DOMContentLoaded', (event)=>{
      _this.onPopState(event)
    })
    //
    window.addEventListener('popstate', (event)=>{
      _this.onPopState(event)
    })
    window.addEventListener('pushState', (event)=>{
      _this.onPopState(event)})
    window.addEventListener('replaceState', (event)=>{
      _this.onPopState(event)
    })
  }

  public onPopState(event: Event) {
    let from = this._lastHref
    let to = _location.href

    const parsedLoc = parseUrl(_location.href);
    const parsedTo = parseUrl(to);
    const parsedFrom = parseUrl(from);

    // 缓存
    this._lastHref = to;

    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      to = parsedTo.relative;
    }

    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      from = parsedFrom.relative;
    }

    if(to !== from ) {
      console.log('navigation from    ' + from)
      console.log('navigation to      ' + to)
    }
  }
}
