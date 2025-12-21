// src/domains/auth/sharedAuth/infrastructure/security/BcryptPasswordHasher.ts
import bcrypt from 'bcrypt'
import { HashedPassword } from '../../model/valueObject/HashedPassword.js'
import { PlainPassword } from '../../model/valueObject/PlainPassword.js'
import { IPasswordHasher } from '../../service/security/IPasswordHasher.js'

export class BcryptPasswordHasher implements IPasswordHasher {
    private static readonly SALT_ROUNDS = 10

    /**
     * 平文パスワードをハッシュ化
     */
    async hash(plainPassword: PlainPassword): Promise<HashedPassword> {
        const hashed = await bcrypt.hash(
            plainPassword.getValue(),
            BcryptPasswordHasher.SALT_ROUNDS
        )
        // ★ ここで new ではなく VO の factory を使う
        return HashedPassword.create(hashed)
    }

    /**
     * 平文とハッシュの一致判定
     */
    async compare(
        plainPassword: PlainPassword,
        hashedPassword: HashedPassword
    ): Promise<boolean> {
        return await bcrypt.compare(
            plainPassword.getValue(),
            hashedPassword.getValue()
        )
    }
}
