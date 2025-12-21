import { ValueObject } from './ValueObject.js'

export class EmailAddress extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): EmailAddress {
        if (!EmailAddress.isValid(value)) {
            throw new Error('Invalid email address')
        }
        return new EmailAddress(value)
    }

    private static isValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
}
