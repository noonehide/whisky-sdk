// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import WhiskyPerformance from './global/performance'
import WhiskyGlobalError from './global/error'
import WhiskyHistory from './behavior/history'
import WhiskyDom from './behavior/dom'

class WhiskySDK {
  static config: IWhiskyConfig;

  static singleton(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', navication: true, dom: true }) {
    WhiskySDK.config = options
    if (window['ws']) {
      return window['ws']
    } else {
      let sdk = new WhiskySDK(options)
      window['ws'] = sdk
      return sdk
    }
  }

  constructor(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', navication: true, dom: true }) {
    // 初始化的时候，立即发送性能数据
    if (WhiskySDK.config.perfermance) {
      const per = new WhiskyPerformance()
      per.active()
    }

    // 监听JsError
    if (WhiskySDK.config.jsError) {
      const error = new WhiskyGlobalError()
      error.active()
    }

    // 监听路由
    if (WhiskySDK.config.navication) {
      const hisotry = new WhiskyHistory()
      hisotry.active()
    }

    if (WhiskySDK.config.dom) {
      const dom = new WhiskyDom()
      dom.active()
    }
  }

  static sendMessage(type: String, data: any) {
    console.log(`sendMesage type=${type}  data=${JSON.stringify(data)}`)
  }

}
export default WhiskySDK
