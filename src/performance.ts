
import utils from './utils/brower'
import each from 'lodash/each'
// performance 中的字段名
// 用一个专门的数组缓存只是为了解决相同的长字符串使用次数过多，导致代码量过大的问题
const TIMING_KEYS = [
  /*  0 */ 'startTime', // startTime 未使用
  /*  1 */ 'fetchStart',
  /*  2 */ 'domainLookupStart',
  /*  3 */ 'domainLookupEnd',
  /*  4 */ 'connectStart',
  /*  5 */ 'connectEnd',
  /*  6 */ 'requestStart',
  /*  7 */ 'responseStart',
  /*  8 */ 'responseEnd',
  /*  9 */ 'domLoading', // domLoading 已废弃
  /* 10 */ 'domInteractive',
  /* 11 */ 'domContentLoadedEventStart', // domContentLoadedEventStart 未使用
  /* 12 */ 'domContentLoadedEventEnd',
  /* 13 */ 'domCompleted', // domCompleted 未使用
  /* 14 */ 'loadEventStart',
  /* 15 */ 'loadEventEnd' // loadEventEnd 未使用
];

export default class Performance {
  public active() {
    if (utils.isSuportPerformance()) {
      let perfData = this.getPerformanceData();
    }
  }

  private getPerformanceData() {
    const datas = {
      // ----------- 阶段耗时 -----------
      /**
       * DNS 连接耗时
       * @calc domainLookupEnd - domainLookupStart
       */
      dns: [3, 2],

      /**
       * TCP 连接耗时
       * @calc connectEnd - connectStart
       *
       */
      tcp: [5, 4],

      /**
       * SSL 连接耗时
       * @calc connectEnd - secureConnectionStart
       */
      ssl: [5, 17],

      /**
       * 网络请求耗时 time to first byte of server client
       * @see https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing
       * @calc responseStart - requestStart
       */
      ttfb: [7, 6],

      /**
       * 数据传输耗时
       * @calc responseEnd - responseStart
       * 数据请求耗时 = 网络请求耗时 + 数据传输耗时
       */
      trans: [8, 7],

      /**
       * dom 解析耗时
       * @calc domInteractive - responseEnd
       * dom 解析耗时 = tti - fpt
       */
      dom: [10, 8],

      /**
       * 资源加载耗时
       * @calc loadEventStart - domContentLoadedEventEnd
       */
      res: [14, 12],

      // --------- 里程碑时间 -----------
      /**
       * first byte
       * @calc responseStart - domainLookupStart
       * fbt = dns + tcp + rtt + trans
       */
      firstbyte: [7, 2],

      /**
       * 首次渲染时间 (first paint time) / 白屏时间
       * @calc responseEnd - fetchStart
       * 定义：请求开始 到 浏览器开始解析第一批 HTML 文档字节
       */
      fpt: [8, 1],

      /**
       * 首次可操作时间 time to interact
       * @calc domInteractive - fetchStart
       * 首次可操作定义：浏览器完成所有 HTML 解析并且完成 DOM 构建，此时浏览器开始加载资源
       */
      tti: [10, 1],

      /**
       * html 加载完成时间，即 dom ready 时间
       * @calc domContentLoadedEventEnd - fetchStart
       * 如果页面有同步执行的 js，则同步 js 执行时间 = ready - tti
       */
      ready: [12, 1],

      /**
       * 从开始加载到完全加载时间
       * @calc loadEventStart - fetchStart
       * load = 首次渲染时间 + dom 解析耗时 + 同步 js 执行 + 资源加载耗时
       */
      load: [14, 1]
    };
    let perfData = {}
    // tslint:disable-next-line: deprecation
    let timing = window.performance.timing || {}

    each(datas, (value, key) => {
      let beginTimeKey: keyof PerformanceTiming = TIMING_KEYS[value[1]] as any
      let endTimeKey: keyof PerformanceTiming = TIMING_KEYS[value[0]] as any

      let begin = timing[beginTimeKey]
      let end = timing[endTimeKey]

      // if (value === 2 || (begin > 0 && end > 0)) {
      //   var cost = Math.round(end - begin);
      //   // 脏数据过滤: 耗时大于 0 并且小于 1 小时 (1e3 * 3600)
      //   if (cost >= 0 && cost < 3600 * 1e3) {
      //     perfData[k] = cost;
      //   }
      // }
    })
    return perfData
  }
}
