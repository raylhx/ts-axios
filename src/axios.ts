import { AxiosRequestConfig, AxiosPromise } from './types'
import { buildURL } from './utils/url'
import xhr from './xhr'
import { transformRequest, transformResponse } from './utils/data'
import { processHeaders } from './utils/header'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  console.log('config', config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
/**
 * 请求前处理
 * @param config 需要处理的请求参数
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.headers = transfromHeaders(config)
  config.data = transfromRequestData(config)
}

/**
 * url 处理(get方法)
 * @param config 需要处理的url请求参数：url, params
 */
function transfromURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
/**
 * 处理post请求的data数据
 * @param config 需要处理的参数：data
 */
function transfromRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

/**
 * 处理请求体中的header
 * @param config 需要出的参数： header
 */
function transfromHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
/**
 *
 * @param res 返回结果
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
/**
 *  最终导出的axios对象
 */
export default axios
