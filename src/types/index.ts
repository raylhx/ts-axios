/**
 * 提供给外部或者内部使用的接口
 */

/**
 * 用Method去约束method的参数
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

  // 字符串索引签名
  [propName: string]: any

  // 修改默认配置
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  // 取消
  cancelToken?: CancelToken
  widthCredentials?: boolean

  // CSRF
  xsrfCookieName?: string
  xsrfHeaderName?: string

  // 上传、下载进度
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  // HTTP授权
  auth?: AxiosBasicCredentials

  // 自定义合法状态码
  validateStatus?: (status: number) => boolean

  // 自定义参数序列化
  paramsSerializer?: (params: any) => string

  // base url
  baseURL?: string
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

/**
 * 响应
 */
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * 支持promise返回AxiosResponse类型
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
 * 描述Axios的方法
 */
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 实现函数重载，可传递1个参数或者是2个参数
 */
export interface AxiosInstance extends Axios {
  // 定时器
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (msg?: string): Cancel
}

/**
 * 静态接口
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  // 取消方法
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

/**
 * 拦截器 接口
 */
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

/**
 * 取消
 */
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  // 异常
  throwIfRequested(): void
}

/**
 * 取消方法
 */
export interface Canceler {
  (message?: string): void
}

/**
 *
 */
export interface CancelExecutor {
  (cancel: Canceler): void
}

/**
 * ??
 */
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

/**
 * HTTP授权接口
 */
export interface AxiosBasicCredentials {
  username: string
  password: string
}
