/**
 * 处理请求url参数工具
 */
import { isDate, isObject } from './isType'
export function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/g, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!url) return ''
  // 处理url参数中的hash #值，请求http链接中不包含#hash值
  const markIndex = url.indexOf('#')
  url = markIndex !== -1 ? url.slice(0, markIndex) : url

  // 如果没有参数，直接返回url
  if (!params) return url

  // parts数组负责装入键值对
  const parts: string[] = []
  Object.keys(params).forEach(item => {
    let key = item
    let val = params[key]

    if (val === null || typeof val === 'undefined') return

    /**
     * 临时数组：存放参数params中数组值,
     * 比如
     * {
     *  foo: [11,22,33]
     * }
     */
    let arrTemp: string[]
    if (Array.isArray(val)) {
      arrTemp = val
      key += '[]'
    } else {
      arrTemp = [val]
    }
    arrTemp.forEach(item => {
      if (isDate(item)) {
        val = item.toISOString()
      } else if (isObject(item)) {
        val = JSON.stringify(item)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 序列化参数
  const serializeParams = parts.join('&')
  url += `${url.indexOf('?') === -1 ? '?' : '&'}${serializeParams}`
  return url
}
