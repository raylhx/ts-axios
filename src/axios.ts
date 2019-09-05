import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './utils'
import defaults from './core/defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import { Cancel, isCancel } from './cancel/Cancel'

/**
 * 创建axios的工厂函数
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const ctx = new Axios(config)
  const instance = Axios.prototype.request.bind(ctx) // 绑定上下文

  extend(instance, ctx)
  return instance as AxiosStatic
}
// 传入默认配置
const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
// 取消
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
export default axios
