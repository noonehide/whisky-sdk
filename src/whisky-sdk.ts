// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
import WhiskyPerformance from './performance'

interface IWhiskyConfig {
  perfermance: true,
  jsError: true,
  api: true,
  url: ''
}

export default class WhiskySDK {
  // config: IWhiskyConfig;

  static init(options: IWhiskyConfig = {perfermance: true, jsError: true, api: true, url: ''}) {
    const config = Object.assign({}, options)
    if (config.perfermance) {
      const per = new WhiskyPerformance()
      per.active()
    }
  }

  // constructor(options: IWhiskyConfig = {perfermance: true, jsError: true, api: true, url: ''}) {
  //   this.config = Object.assign({}, options)
  //   if (this.config.perfermance) {
  //     const per = new WhiskyPerformance()
  //     per.active()
  //   }
  // }
}
