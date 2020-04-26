interface Window{
  ws: any;
  chrome: any;
  attachEvent<K extends keyof WindowEventMap>(type: string, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  detachEvent<K extends keyof WindowEventMap>(type: string, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
}

interface Event {
  detail: any
}

interface Document {
  attachEvent<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  attachEvent(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  detachEvent<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  detachEvent(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

interface IWhiskyConfig {
  perfermance: true,
  jsError: true,
  api: true,
  url: '',
  navication: true,
  dom: true
}


