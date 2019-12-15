import store from '@/vuex/store'
// 引入axios
import axios from 'axios'


const httpService = axios.create({

  // url前缀-'https://some-domain.com/api/'
  baseURL: 'http://localhost:8082',
  // baseURL: 'http://119.23.189.216:8082',
  // 请求超时时间
  timeout: 20000,
  withCredentials: false
})

httpService.interceptors.request.use(
  config => {
    // 根据条件加入token-安全携带
    if (store.state.token!=undefined) {
      // 需自定义
      // 让每个请求携带token
      config.headers['Authorization'] = store.state.token
    }
    return config
  },
  error => {
    // 请求错误处理
    Promise.reject(error)
  }
)

// respone拦截器
httpService.interceptors.response.use(
  response => {
    // 统一处理状态
    const res = response
    if (res.statuscode >= 400) { // 需自定义
      // 返回异常
      return Promise.reject(new Error({
        status: res.data.statuscode,
        message: res.data.message
      }))
    } else {
      return response
    }
  },
  // 处理处理
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `未知错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error)
  }
)

export default httpService
