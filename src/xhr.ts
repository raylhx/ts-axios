import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(() => {
    const { data = null, url, method = 'get', headers, responseType } = config
    // 生成一个xhr对象 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      const responseHeaders = request.getAllResponseHeaders() // ??? TODO
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
      resolve(response)
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
  })
}
