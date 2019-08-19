import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders, createError } from '../utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    // 生成一个xhr对象 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 处理超时
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // ??? TODO
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      let response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 错误处理
    request.onerror = function handleError() {
      // reject(new Error('Network Error'))
      reject(createError('Network Error', config, null, request))
    }

    // 超时报错
    request.ontimeout = function hadleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // data为null时，删除请求体中的'content-type'
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
    // 处理非200状态码函数
    function handleResponse(res: AxiosResponse) {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        // reject(new Error(`Request failed with status code ${res.status}`))
        reject(
          createError(`Request failed with status code ${res.status}`, config, null, request, res)
        )
      }
    }
  })
}
