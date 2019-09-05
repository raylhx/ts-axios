import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import transform from './transform'
import {
  buildURL,
  transformRequest,
  transformResponse,
  processHeaders,
  flattenHeaders,
  isAbsoulteURL,
  combineURL
} from '../utils'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  console.log('config', config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 请求前处理
 * @param config 需要处理的请求参数
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  // config.headers = transfromHeaders(config)
  // config.data = transfromRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * url 处理(get方法)
 * @param config 需要处理的url请求参数：url, params
 */
function transfromURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoulteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
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
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
