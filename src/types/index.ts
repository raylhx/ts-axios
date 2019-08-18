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
  | 'options'
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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: any
  timeout?: number
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

/**
 * 错误 暴露给外部使用
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * 扩展 axios 混合对象
 */
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise // todo ????

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
