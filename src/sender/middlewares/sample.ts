// 采样率中间件，采样率为0-1之间，默认为1，1是必传

const sample = (params: any) => {
  let res = {
    ...params.data,
    needSend: Math.random() < params.config.sample
  }
  return {
    data: res,
    config: params.config,
    breadcrumbList: params.breadcrumbList
  };
}

export default sample
