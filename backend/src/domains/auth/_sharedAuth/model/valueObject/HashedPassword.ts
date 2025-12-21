import { ValueObject } from '@/domains/_sharedDomains/model/valueObject/ValueObject.js'

export class HashedPassword extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    /**
     * 新規作成（入力値のバリデーションあり）
     * - create は利用者のコードが生成したハッシュのみを許可する
     */
    static create(value: string): HashedPassword {
        if (!value.startsWith('$2b$')) {
            throw new Error('Invalid hashed password format')
        }
        return new HashedPassword(value)
    }

    /**
     * 復元用（DB → Domain）
     * - create と違ってフォーマットチェックを行わない
     * - DB の値が信用できる環境（永続化層）でのみ使用する
     */
    static reconstruct(value: string): HashedPassword {
        return new HashedPassword(value)
    }
}
