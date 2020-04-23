// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
import WhiskyPerformance from './performance'
import WhiskyGlobalError from './error'

interface IWhiskyConfig {
  perfermance: true,
  jsError: true,
  api: true,
  url: ''
}


class WhiskySDK {
  config: IWhiskyConfig;
  static sendMessage: () => void;

  static singleton(options: IWhiskyConfig = {perfermance: true, jsError: true, api: true, url: ''}) {
    window['ws'] = new WhiskySDK(options)
  }

  constructor(options: IWhiskyConfig = {perfermance: true, jsError: true, api: true, url: ''}) {
    this.config = Object.assign({}, options)
    // 初始化的时候，立即发送性能数据
    if (this.config.perfermance) {
      const per = new WhiskyPerformance()
      per.active()
    }
    // 监听JsError
    if (this.config.jsError) {
      const error = new WhiskyGlobalError()
      error.active()
    }

    // 监听pv,uv

    // 监听资源
  }

  sendMessage () {
    console.log('sendMessage')
  }
}

WhiskySDK.sendMessage = function () {
  console.log('sendMessage')
}
export default WhiskySDK
