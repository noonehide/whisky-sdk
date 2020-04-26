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

export function isChromePackagedApp() {
  return window.chrome && window.chrome.app && window.chrome.app.runtime;
}


export function hasPushAndReplaceState() {
  return !isChromePackagedApp &&
    window.history &&
    window.history.pushState &&
    window.history.replaceState;
}

// parseUrl
export function parseUrl(url: string) {

  let match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  return {
    protocol: match && match[2] ? match[2] : '',
    host: match && match[4] ? match[4] : '',
    relative: url // everything minus origin
  };
}


export function emitEvent(name: string, payload?: any) {
  let e: Event;
  if (window.CustomEvent) {
    e = new CustomEvent(name, { detail: payload });
  } else {
    e = document.createEvent('HTMLEvents');
    e.initEvent(name, false, true);
    e.detail = payload;
  }
  window.dispatchEvent(e);
};

function isString(what: any) {
  return Object.prototype.toString.call(what) === '[object String]';
}

/**
 *
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @param elem
 */
export function htmlTreeAsString(elem: any) {
  let MAX_TRAVERSE_HEIGHT = 5
  let MAX_OUTPUT_LEN = 80
  let out = []
  let height = 0
  let len = 0
  let separator = ' > '
  let sepLength = separator.length
  let nextStr
  while (elem && height++ < MAX_TRAVERSE_HEIGHT) {
    nextStr = htmlElementAsString(elem);
    if (
      nextStr === 'html' ||
      (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)
    ) {
      break;
    }

    out.push(nextStr);

    len += nextStr.length;
    elem = elem.parentNode
  }

  return out.reverse().join(separator);
}

function htmlElementAsString(elem: any) {
  let out = []
  let className
  let classes
  let key
  let attr
  let i

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());
  if (elem.id) {
    out.push('#' + elem.id);
  }

  className = elem.className;
  if (className && isString(className)) {
    classes = className.split(/\s+/);
    for (i = 0; i < classes.length; i++) {
      out.push('.' + classes[i]);
    }
  }
  let attrWhitelist = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < attrWhitelist.length; i++) {
    key = attrWhitelist[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push('[' + key + '="' + attr + '"]');
    }
  }
  return out.join('');
}

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
