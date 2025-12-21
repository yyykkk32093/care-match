import { ValueObject } from '@/domains/_sharedDomains/model/valueObject/ValueObject.js'

export class PlainPassword extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    /**
     * 新規作成（入力値のバリデーションあり）
     */
    static create(value: string): PlainPassword {
        if (!value || value.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }
        return new PlainPassword(value)
    }

}
