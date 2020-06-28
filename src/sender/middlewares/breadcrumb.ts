// 行为记录
const breadcrumb = (params: any) => {
  let res = {
    ...params.data,
    breadcrumbList: params.breadcrumbList
  }
  return {
    data: res,
    config: params.config,
    breadcrumbList: params.breadcrumbList
  };
}

export default breadcrumb
