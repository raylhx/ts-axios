import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './utils'
import defaults from './core/defaults'

// AxiosStatic  TODO
/**
 * 创建axios的工厂函数
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const ctx = new Axios(config)
  const instance = Axios.prototype.request.bind(ctx) // 绑定上下文

  extend(instance, ctx)
  return instance as AxiosInstance
}

// 传入默认配置
const axios = createInstance(defaults)
export default axios
