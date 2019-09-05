/**
 * 处理请求url参数工具
 */
import { isDate, isPlainObject, isURLSearchParams } from './isType'

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

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!url) return ''
  // 处理url参数中的hash #值，请求http链接中不包含#hash值
  const markIndex = url.indexOf('#')
  url = markIndex !== -1 ? url.slice(0, markIndex) : url

  // 如果没有参数，直接返回url
  if (!params) return url

  let serializeParams

  if (paramsSerializer) {
    serializeParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializeParams = params.toString()
  } else {
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
        } else if (isPlainObject(item)) {
          val = JSON.stringify(item)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    // 序列化参数
    serializeParams = parts.join('&')
  }

  // parts数组负责装入键值对

  url += `${url.indexOf('?') === -1 ? '?' : '&'}${serializeParams}`
  return url
}

/**
 * 处理同域请求判断
 */

interface URLOrigin {
  protocol: string
  host: string
}
/**
 * 判断请求与本站是否同源
 * @param requestURL 请求地址url
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const resOrigin = resolveURL(requestURL)
  return resOrigin.protocol === currentOrigin.protocol && resOrigin.host === resOrigin.host
}

// 创建a节点
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

/**
 * 判断绝对路径
 */
export function isAbsoulteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

/**
 * 合并url
 */
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
