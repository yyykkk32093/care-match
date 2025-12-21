import { ValueObject } from './ValueObject.js'

export class UserId extends ValueObject<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): UserId {
    if (!value || value.trim() === '') {
      throw new Error('UserId cannot be empty')
    }
    return new UserId(value)
  }
}
