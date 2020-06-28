// 环境中间件
const env = (params: any) => {
  let res = {
    ...params.data,
    env: {
      os: '',
      browser: '',
      network: '',
      screenWith: 0,
      screenHeight: 0
    }
  }
  return {
    data: res,
    config: params.config,
    breadcrumbList: params.breadcrumbList
  };
}

export default env
