// 产生uuid
import { SDK_NAME, SDK_VERSION } from '../../config'

const sdk = (params: any) => {
  let res = {
    ...params.data,
    sdk: {
      name: SDK_NAME,
      version: SDK_VERSION,
      type: 'js',
      appid: params.config.appId
    }
  }
  return {
    data: res,
    config: params.config,
    breadcrumbList: params.breadcrumbList
  };
}

export default sdk
