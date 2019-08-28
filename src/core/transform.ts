import { AxiosTransformer } from '../types'

/**
 * 处理转换函数的调用逻辑
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 完成链式传递
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
