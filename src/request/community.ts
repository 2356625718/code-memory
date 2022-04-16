import Axios from '../utils/Axios'

const communityRequest = {
  // 获取列表
  getList: (data: any) => Axios.get('/community/list', {
    params: data
  }),

  // 点赞、收藏、评论
  putAction: (data: any) => Axios.get('/community/action', {
    params: data
  }),

  // 获取评论
  getTalk: (data: any) => Axios.get('/community/talk', {
    params: data
  }),

  // 发起评论
  doTalk: (data: any) => Axios.get('/community/doTalk', {
    params: data
  }),

  // 分享代码片段
  shareCode: (data: any) => Axios.post('/community/share', data),
}

export default communityRequest;