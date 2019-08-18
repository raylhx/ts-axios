import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // 请求
  request(url: any, config?: any): AxiosPromise {
    // 实现重载
    if (typeof url === 'string') {
      // 第一种情况 参数：url，config
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 第二种情况 参数：config
      config = url
    }
    return dispatchRequest(config)
  }
  // get method
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  // post method
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithoutData('options', url, config)
  }

  // post
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    this._requestMethodWithData('patch', url, data, config)
  }
}
