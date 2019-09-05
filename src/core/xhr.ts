import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders, createError, isURLSameOrigin, isFormData, cookie } from '../utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    // 生成一个xhr对象 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)
    // 配置 request 对象
    configureRequest()

    // 添加事件
    addEvents()

    // 处理headers
    processHeaders()

    // 处理请求取消
    processCancel()

    // 发送
    request.send(data)

    // 配置 request 对象
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      // 处理超时
      if (timeout) {
        request.timeout = timeout
      }
      // 处理跨域请求携带cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }
    // 添加事件
    function addEvents(): void {
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

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (withCredentials || (isURLSameOrigin(url!) && xsrfCookieName)) {
        const xsrfValue = cookie.read(xsrfCookieName!)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      // HTTP授权
      if (auth) {
        headers['Authorization'] = `Basic ${btoa(auth.username + ';' + auth.password)}`
      }

      // data为null时，删除请求体中的'content-type'
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // 取消请求 ??
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    // 状态码范围处理
    function handleResponse(res: AxiosResponse): void {
      if (!validateStatus || validateStatus(res.status)) {
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
