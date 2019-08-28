import { isPlainObject } from './isType'

export * from './url'
export * from './header'
export * from './error'
export * from './data'
export * from './isType'
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

/**
 * 复制对象合并
 */
export function deepMerge(...objArr: any[]): any {
  const result = Object.create(null)

  objArr.forEach(obj => {
    if (!obj) return
    Object.keys(obj).forEach(key => {
      let val = obj[key]
      if (isPlainObject(val)) {
        result[key] = isPlainObject(result[key]) ? deepMerge(result[key], val) : deepMerge({}, val)
      } else {
        result[key] = val
      }
    })
  })
  return result
}
