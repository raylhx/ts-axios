import { request } from 'https'

/**
 * 用Method去约束method的参数，避免什么值都可以传入
 */
export type Method =
  | 'get'
  | 'Get'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'Head'
  | 'option'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * 请求
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: any
}

/**
 * 响应
 */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * 支持promise返回AxiosResponse类型
 */
export interface AxiosPromise extends Promise<AxiosResponse> {}

/**
 * XMLHttpRequestResponseType 取值： "" | "arraybuffer" | "blob" | "document" | "json" | "text" | "moz-chunked-arraybuffer" | "ms-stream"
 */
export interface AxiosResponseConfig {
  responseType?: XMLHttpRequestResponseType
}
