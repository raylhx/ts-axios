const toString = Object.prototype.toString
/**
 * 是否为时间
 * @param val 需要怕断的字符串
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
/**
 * 判断是否为一个对象
 * @param val
 */
// 类型保护？？？
export function isObject(val: any): val is Object{
  return val!== null && typeof val === 'object'
}
/**
 * 判断是否为普通对象
 * @param val
 */
export function isPlainObject(val: any): val is Object{
  return toString.call(val) === '[object Object]'
}
