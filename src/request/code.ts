import Axios from '../utils/Axios'

const codeRequest = {
  // 根据用户id获取代码片段信息
  getCode: (data: any) => Axios.get('/code/getCode', {
    params: data
  }),
}

export default codeRequest;