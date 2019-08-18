import { buildURL } from './url'

/**
 * 把from的属性、包括原型上的属性都扩展到to上
 * 交叉类型、断言？？
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
