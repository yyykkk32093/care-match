// src/domains/user/domain/model/valueObject/DisplayName.ts
import { ValueObject } from '@/domains/_sharedDomains/model/valueObject/ValueObject.js'

export class DisplayName extends ValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): DisplayName {
        const trimmed = value.trim()
        if (!trimmed) {
            throw new Error('DisplayName must not be empty')
        }
        if (trimmed.length > 50) {
            // 必要なら上限はプロジェクト仕様に合わせて変更してOK
            throw new Error('DisplayName must be 50 characters or less')
        }
        return new DisplayName(trimmed)
    }

    static createNullable(value: string | null | undefined): DisplayName | null {
        if (value == null) return null
        return DisplayName.create(value)
    }
}
