export function isSuportPerformance(): boolean {
  return (
    window.performance &&
    !!performance.getEntriesByType &&
    !!performance.now &&
    !!performance.mark
  );
}

export function isSuportPerformanceObserver(): boolean {
  return (window as any).chrome && 'PerformanceObserver' in window;
}

export function each(collection: any, callback: any) {
  let value
  let i: any = 0
  let length = collection.length

  if (Array.isArray(collection)) {
    for (; i < length; i++) {
      value = callback.call(collection[i], collection[i], i);
      if (value === false) {
        break;
      }
    }
  } else {
    for (i in collection) {
      value = callback.call(collection[i], collection[i], i);
      if (value === false) {
        break;
      }
    }
  }
  return collection
}

/**
 * 事件绑定
 */
export function on<K extends keyof WindowEventMap>(target: Window, type: K, callback: Function, isOnce: boolean): any {
  if (target.addEventListener) {
    target.addEventListener(type, function __fn(e: Event) {
      isOnce && target.removeEventListener(type, __fn, false);
      callback.call(this, e);
    }, false);
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, function __fn(e: Event) {
      isOnce && target.detachEvent('on' + type, __fn);
      callback.call(this, e);
    });
  }
}

/**
 * 事件解绑
 */

export function off<K extends keyof WindowEventMap>(target: Window, type: K, callback: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
  if (!callback) return;
  if (target.removeEventListener) {
    target.removeEventListener(type, callback);
  } else if (target.detachEvent) {
    target.detachEvent(type, callback);
  }
}

export function isChromePackagedApp () {
  return window.chrome && window.chrome.app && window.chrome.app.runtime;
}


export function hasPushAndReplaceState () {
  return !isChromePackagedApp &&
  window.history &&
  window.history.pushState &&
  window.history.replaceState;
}



// parseUrl
export function parseUrl(url: string) {

  let match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  return {
    protocol: match && match[2] ? match[2]: '',
    host: match && match[4] ? match[4]: '',
    relative: url // everything minus origin
  };
}

export function emitEvent(name: string, payload?: any) {
  let e:Event;
  if (window.CustomEvent) {
      e = new CustomEvent(name, {detail: payload});
  } else {
      e = document.createEvent('HTMLEvents');
      e.initEvent(name, false, true);
      e.detail = payload;
  }
  window.dispatchEvent(e);
};

export default {
  isSuportPerformance,
  isSuportPerformanceObserver,
  each,
  on,
  off,
  parseUrl,
  hasPushAndReplaceState,
  isChromePackagedApp,
  emitEvent
}
