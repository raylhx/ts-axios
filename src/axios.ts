import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './utils'

/**
 * 创建axios的工厂函数
 */
function createInterface(): AxiosInstance {
  const ctx = new Axios()
  const instance = Axios.prototype.request.bind(ctx) // 绑定上下文

  extend(instance, ctx) // ???
  return instance as AxiosInstance
}

const axios = createInterface()
export default axios
