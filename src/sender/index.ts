import compose from '../utils/compose'
import sampleMiddleware from './middlewares/sample'
import userMiddleware from './middlewares/user'
import sdkMiddleware from './middlewares/sdk'
import envMiddleware from './middlewares/env'
import breadcrumbMiddleware from './middlewares/breadcrumb'
import { Type } from '../const'

export default class Sender {
  static instance: Sender;
  static middlewares = [sampleMiddleware, userMiddleware, sdkMiddleware, envMiddleware, breadcrumbMiddleware] as Function[]

  breadcrumbList: any[];
  // sendMessage: (url: string, data?: string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined) => boolean

  static getInstance() {
    if (!this.instance) {
      this.instance = new Sender();
    }
    return this.instance;
  }

  constructor() {
    this.breadcrumbList = new Array()
    // this.sendMessage = navigator.sendBeacon || new Function('var xhr=new XMLHttpRequest();xhr.open("POST",arguments[0],true);r.send(arguments[1]);');
  }

  push(type: String, data: any, config: IWhiskyConfig) {
    let res = compose(...Sender.middlewares)({
      data, config, breadcrumbList: this.breadcrumbList
    })

    console.log('res', res)
    // 添加行为记录
    if (type !== Type.Performance) {
      this.breadcrumbList.push({
        type: type,
        data: res.data.event
      })
    }

    // 立即发送
    if (res.data.needSend) {
      navigator.sendBeacon(config.url, JSON.stringify(res.data))
    }
  }
}
