// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import WhiskyPerformance from './global/performance'
import WhiskyGlobalError from './global/error'
import WhiskyHistory from './behavior/history'
import WhiskyDom from './behavior/dom'

class WhiskySDK {

  static config: IWhiskyConfig;

  static singleton(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', navication: true, dom: true, sample: 1, appId: '' }) {
    WhiskySDK.config = options
    let sdk = new WhiskySDK(options)
    window['ws'] = sdk
    return sdk
  }

  constructor(options: IWhiskyConfig = { perfermance: true, jsError: true, api: true, url: '', navication: true, dom: true, sample: 1, appId: '' }) {
    // 初始化的时候，立即发送性能数据
    if (WhiskySDK.config.perfermance) {
      const per = new WhiskyPerformance(WhiskySDK.config)
      per.active()
    }
    // 监听JsError
    if (WhiskySDK.config.jsError) {
      const error = new WhiskyGlobalError(WhiskySDK.config)
      error.active()
    }
    // 监听路由
    if (WhiskySDK.config.navication) {
      const hisotry = new WhiskyHistory(WhiskySDK.config)
      hisotry.active()
    }

    // 监听dom操作
    if (WhiskySDK.config.dom) {
      const dom = new WhiskyDom(WhiskySDK.config)
      dom.active()
    }
  }
}
export default WhiskySDK
