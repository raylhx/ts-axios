import { isPlainObject } from './isType'
import { Method } from '../types'
import { deepMerge } from '.'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  // 检查属性名是否标准化
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
/**
 *
 * @param headers 处理header头部信息
 * @param data
 */
export function processHeaders(headers: any, data: any): any {
  // 标准化
  normalizeHeaderName(headers, 'Content-Type')
  // 如果是普通对象且没有添加Content-Type信息
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

/**
 * 处理config请求头 todo 没搞懂他们为什么合并
 */
export function flattenHeaders(headers: any, method: Method) {
  if (!headers) return headers
  // 合并
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  // 合并完成之后删除相关属性
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
