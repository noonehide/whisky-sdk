// 产生uuid
import { uuid4 } from '../../utils/brower'

const user = (params: any) => {
  let res = {
    ...params.data,
    eventId: uuid4(),
    user: {
      uuid: params.config.uuid,
      project: params.config.project
    }
  }
  return {
    data: res,
    config: params.config,
    breadcrumbList: params.breadcrumbList
  };
}

export default user
