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

export function each<T>(collection: (any[] | any), callback: any) {
  let value
  let i: any = 0

  if (Array.isArray(collection)) {
    let length = collection.length
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
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
export function htmlTreeAsString(elem: unknown): string {
  type SimpleNode = {
    parentNode: SimpleNode;
  } | null;

  // try/catch both:
  // - accessing event.target (see getsentry/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    let currentElem = elem as SimpleNode;
    const MAX_TRAVERSE_HEIGHT = 5;
    const MAX_OUTPUT_LEN = 80;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = ' > ';
    const sepLength = separator.length;
    let nextStr;

    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem);
      // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)
      if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
        break;
      }

      out.push(nextStr);

      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }

    return out.reverse().join(separator);
  } catch (_oO) {
    return '<unknown>';
  }
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function _htmlElementAsString(el: unknown): string {
  const elem = el as {
    getAttribute(key: string): string; // tslint:disable-line:completed-docs
    tagName?: string;
    id?: string;
    className?: string;
  };

  const out = [];
  let className;
  let classes;
  let key;
  let attr;
  let i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());
  if (elem.id) {
    out.push(`#${elem.id}`);
  }

  className = elem.className;
  if (className && isString(className)) {
    classes = className.split(/\s+/);
    for (i = 0; i < classes.length; i++) {
      out.push(`.${classes[i]}`);
    }
  }
  const allowedAttrs = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push(`[${key}="${attr}"]`);
    }
  }
  return out.join('');
}

/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
export function uuid4(): string {
  const global = window;
  const crypto = global.crypto || global.msCrypto;

  if (!(crypto === void 0) && crypto.getRandomValues) {
    // Use window.crypto API if available
    const arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    // tslint:disable-next-line:no-bitwise
    arr[3] = (arr[3] & 0xfff) | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    // tslint:disable-next-line:no-bitwise
    arr[4] = (arr[4] & 0x3fff) | 0x8000;

    const pad = (num: number): string => {
      let v = num.toString(16);
      while (v.length < 4) {
        v = `0${v}`;
      }
      return v;
    };

    return (
      pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7])
    );
  }
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


/**
 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
export function isPrimitive(wat: any): boolean {
  return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
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
  emitEvent,
  uuid4,
  isPrimitive
}
