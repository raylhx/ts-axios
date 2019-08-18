import { isPlainObject } from "./isType";

/**
 * data 在请求体中，可能是如下值：Document 和 BodyInit 类型，BodyInit 包括了 Blob, BufferSource, FormData, URLSearchParams, ReadableStream、USVString 可以见https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send，所以传入的data的类型为any
 *
 * 处理请求/响应中data的值
 */
export function transformRequest(data: any): any{
  // 如果data是一个普通对象，需要转为json字符串
  if (isPlainObject(data)){
    return JSON.stringify(data)
  }
  return data
}
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
