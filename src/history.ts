import { hasPushAndReplaceState, parseUrl, emitEvent } from './utils/brower'

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
    // 首次加载需要手动触发
    window.addEventListener('DOMContentLoaded', this.onPopState)
    //
    window.addEventListener('popstate', this.onPopState)
    window.addEventListener('pushState', this.onPopState)
    window.addEventListener('replaceState', this.onPopState)
  }

  public onPopState(event: Event) {
    console.log('this._lastHref, ', this._lastHref)

    let from = this._lastHref
    let to = _location.href

    console.log('navigation from' + from)
    console.log('navigation to' + to)

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
  }
}
