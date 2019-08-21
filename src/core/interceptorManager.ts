import { ResolveFn, RejectedFn } from '../types'

/**
 * 定义拦截器
 */
interface Interceptor<T> {
  resolved: ResolveFn
  rejected: RejectedFn
}

/**
 * 拦截器管理类
 */
export default class InterceptorManager<T> {
  // 使用私有属性 数组存储拦截器
  private interceptors: Array<Interceptor<T> | null>
  // 初始化拦截器
  constructor() {
    this.interceptors = []
  }
  /**
   * 添加拦截器
   */
  use(resolved: ResolveFn<T>, rejected: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  /**
   *
   * @param fn 执行函数
   */
  interceptorForEach(fn: (i: Interceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }
  /**
   * 删除拦截器
   * @param id 拦截器id
   */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
