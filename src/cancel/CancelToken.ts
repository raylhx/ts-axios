import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(excutor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    excutor(message => {
      if (this.reason) return
      this.reason = message
      // 相当于 resolve(this.reason)
      resolvePromise(this.reason)
    })
  }
}
