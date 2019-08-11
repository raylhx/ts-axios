import { AxiosRequestConfig } from './types'
import { buildURL } from './utils/url'
import xhr from './xhr'
import { transformRequest } from './utils/data'
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  console.log('config', config)
  xhr(config)
}
/**
 * 请求前处理
 * @param config 需要处理的请求参数
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
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

function transfromRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

/**
 *  最终导出的axios对象
 */
export default axios
