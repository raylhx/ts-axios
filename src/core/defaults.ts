import { AxiosRequestConfig } from '../types'

const defaults: AxiosRequestConfig = {
  // 默认请求方法
  method: 'get',

  // 默认超时时间
  timeout: 0,
  // 默认 headers
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsWithoutData = ['delete', 'get', 'head', 'options']
methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
