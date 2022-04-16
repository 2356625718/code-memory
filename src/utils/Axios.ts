import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000000000,
});

Axios .interceptors.request.use( config => {
  //在发送请求之前做的一些操作，例如加上token这些
  return config
}, error => {
  //对请求错误做些什么
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  //接收到响应后要做些什么，比如跳转到登录页
  return response
}, error => {
 //对响应错误做些什么
 return Promise.reject(error)
})

export default Axios;