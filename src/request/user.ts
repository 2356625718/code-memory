import Axios from '../utils/Axios'

const userRequest = {
  // 注册
  register: (data: any) => Axios.post('/user/register', data),
  // 登录
  login: (data: any) => Axios.post('/user/login', data)
}

export default userRequest;