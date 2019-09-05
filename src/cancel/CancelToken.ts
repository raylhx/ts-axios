import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import { Cancel } from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(excutor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    excutor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      // 相当于 resolve(this.reason)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(e => {
      cancel = e
    })
    return {
      cancel,
      token
    }
  }
  throwIfRequested(): void {
    // 如果token已经使用过，抛错
    if (this.reason) {
      throw this.reason
    }
  }
}
