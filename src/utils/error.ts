import { AxiosResponse, AxiosRequestConfig } from "../types";

export class AxiosError extends Error {
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse,
  isAxiosError: boolean,

  constructor (
    message: string,
    config: AxiosRequestConfig,
    code: string | null,
    request?: any,
    response?: AxiosResponse
  ){
    // 继承error
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    // 这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑
    Object.setPrototypeOf(this, AxiosError.prototype) // todo

  }
}
// 工厂函数

export function createError (
  message: string,
  config: AxiosRequestConfig,
  code: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError{
  const error = new AxiosError(message, config, code, request, response)
  return error
}
