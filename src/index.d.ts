interface Window{
  ws: any;
  attachEvent<K extends keyof WindowEventMap>(type: string, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  detachEvent<K extends keyof WindowEventMap>(type: string, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
}


interface IWhiskyConfig {
  perfermance: true,
  jsError: true,
  api: true,
  url: '',
  enableSpa: true
}
