export class Cancel {
  message?: string
  constructor(msg?: string) {
    this.message = msg
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
