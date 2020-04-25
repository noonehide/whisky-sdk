// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import WhiskyPerformance from './performance'
import WhiskyGlobalError from './error'
import WhiskyHistory from './history'


class WhiskySDK {
  config: IWhiskyConfig;
  static sendMessage: () => void;

  static singleton(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', enableSpa: true, navication: true }) {
    if (window['ws']) {
      return window['ws']
    } else {
      let sdk = new WhiskySDK(options)
      window['ws'] = sdk
      return sdk
    }
  }

  constructor(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', enableSpa: true, navication: true }) {
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

    if (this.config.navication) {
      const hisotry = new WhiskyHistory()
      hisotry.active()
    }

    // 监听pv,uv

    // 监听资源
  }

  sendMessage() {
    console.log('sendMessage')
  }

  setOption(option: IWhiskyConfig) {

  }
}

WhiskySDK.sendMessage = function () {
  console.log('sendMessage')
}
export default WhiskySDK
