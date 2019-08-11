const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 类型保护？？？
export function isObject(val: any): val is Object{
  return val!== null && typeof val === 'object'
}
