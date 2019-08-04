import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config
  //生成一个xhr对象 https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
