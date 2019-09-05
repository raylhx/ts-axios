import { AxiosRequestConfig } from '../types'
import { processHeaders, transformRequest, transformResponse } from '../utils'

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
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // 自定义合法状态码
  validateStatus(status: number): boolean {
    return status >= 200 && status <= 300
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
