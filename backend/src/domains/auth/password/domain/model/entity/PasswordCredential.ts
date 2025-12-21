// src/domains/auth/password/domain/model/entity/PasswordCredential.ts

import { AggregateRoot } from '@/domains/_sharedDomains/model/entity/AggregateRoot.js'
import { HashedPassword } from '@/domains/auth/_sharedAuth/model/valueObject/HashedPassword.js'
import { PlainPassword } from '@/domains/auth/_sharedAuth/model/valueObject/PlainPassword.js'
import { IPasswordHasher } from '@/domains/auth/_sharedAuth/service/security/IPasswordHasher.js'

/**
 * パスワード認証用クレデンシャル（集約ルート）
 * 
 * - User とは別集約
 * - ハッシュ済みパスワードの保持
 * - サインイン検証と、その結果に応じたドメインイベント発火
 */// src/domains/auth/password/domain/model/entity/PasswordCredential.ts

export class PasswordCredential extends AggregateRoot {
    private constructor(
        private readonly userId: string,
        private hashedPassword: HashedPassword,
        private readonly createdAt: Date,
        private updatedAt: Date
    ) {
        super()
    }

    // Factory
    static create(params: {
        userId: string;
        hashedPassword: HashedPassword;
    }): PasswordCredential {
        return new PasswordCredential(
            params.userId,
            params.hashedPassword,
            new Date(),
            new Date()
        )
    }

    // Reconstruct
    static reconstruct(params: {
        userId: string;
        hashedPassword: string;
        createdAt: Date;
        updatedAt: Date;
    }): PasswordCredential {
        return new PasswordCredential(
            params.userId,
            HashedPassword.reconstruct(params.hashedPassword),
            params.createdAt,
            params.updatedAt
        )
    }

    // ✔ 変更点：verify のみ
    async verify(
        plain: PlainPassword,
        hasher: IPasswordHasher
    ): Promise<boolean> {
        return hasher.compare(plain, this.hashedPassword)
    }

    // パスワード更新（これは状態変化なのでイベント発火してよい）
    changePassword(newHashedPassword: HashedPassword) {
        this.hashedPassword = newHashedPassword
        this.updatedAt = new Date()

        // this.addDomainEvent(new PasswordChangedEvent(...)) ←後で追加可能
    }

    // Getters
    getUserId() { return this.userId }
    getHashedPassword() { return this.hashedPassword }
    getCreatedAt() { return this.createdAt }
    getUpdatedAt() { return this.updatedAt }
}
