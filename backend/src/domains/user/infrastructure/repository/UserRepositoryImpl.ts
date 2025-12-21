import { prisma } from '@/_sharedTech/db/client.js'

import { User } from '../../domain/model/entity/User.js'
import { IUserRepository } from '../../domain/repository/IUserRepository.js'

export class UserRepositoryImpl implements IUserRepository {

    // ============================================================
    // Find
    // ============================================================
    async findById(id: string): Promise<User | null> {
        const record = await prisma.user.findUnique({
            where: { id },
            include: {
                passwordCredential: true,
            },
        })

        if (!record) return null
        return this.toDomain(record)
    }

    async findByEmail(email: string): Promise<User | null> {
        const record = await prisma.user.findUnique({
            where: { email },
            include: {
                passwordCredential: true,
            },
        })

        if (!record) return null
        return this.toDomain(record)
    }

    // ============================================================
    // Save / Upsert
    // ============================================================
    async save(user: User): Promise<void> {

        const data = this.toPersistence(user)

        // User 本体をアップサート
        await prisma.user.upsert({
            where: { id: data.id },
            update: {
                displayName: data.displayName,
                role: data.role,
                email: data.email,
                phone: data.phone,
                biography: data.biography,
                avatarUrl: data.avatarUrl,
                notificationSetting: data.notificationSetting,
                updatedAt: new Date(),
            },
            create: {
                id: data.id,
                displayName: data.displayName,
                role: data.role,
                email: data.email,
                phone: data.phone,
                biography: data.biography,
                avatarUrl: data.avatarUrl,
                notificationSetting: data.notificationSetting,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        })

        // PasswordCredential の upsert
        const cred = data.passwordCredential

        if (cred) {
            await prisma.passwordCredential.upsert({
                where: { userId: data.id },
                update: {
                    hashedPassword: cred.hashedPassword,
                    updatedAt: new Date(),
                },
                create: {
                    userId: data.id,
                    hashedPassword: cred.hashedPassword,
                    createdAt: cred.createdAt,
                    updatedAt: cred.updatedAt,
                }
            })
        }
    }

    // ============================================================
    // Domain → Persistence
    // ============================================================
    private toPersistence(user: User) {

        const n = user.getNotificationSetting().getValue()
        const credential = user.getPasswordCredential()

        return {
            id: user.getId().getValue(),
            displayName: user.getDisplayName(),
            role: user.getRole().getValue(),
            email: user.getEmail(),
            phone: user.getPhone()?.getValue() ?? null,
            biography: user.getBiography()?.getValue() ?? null,
            avatarUrl: user.getAvatarUrl()?.getValue() ?? null,

            notificationSetting: {
                emailEnabled: n.emailEnabled,
                pushEnabled: n.pushEnabled,
                activityReminderEnabled: n.activityReminderEnabled,
                quietHours: n.quietHours,
            },

            // persistence 用に sub-object として返す
            passwordCredential: credential
                ? {
                    hashedPassword: credential.getHashedPassword().getValue(),
                    createdAt: credential.getCreatedAt(),
                    updatedAt: credential.getUpdatedAt(),
                }
                : null,

            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        }
    }

    // ============================================================
    // Persistence → Domain
    // ============================================================
    private toDomain(record: any): User {

        return User.reconstruct({
            id: record.id,
            displayName: record.displayName,
            role: record.role,
            email: record.email,
            phone: record.phone,
            biography: record.biography,
            avatarUrl: record.avatarUrl,

            notification: record.notificationSetting,

            passwordCredential: record.passwordCredential
                ? {
                    hashedPassword: record.passwordCredential.hashedPassword,
                    createdAt: record.passwordCredential.createdAt,
                    updatedAt: record.passwordCredential.updatedAt,
                }
                : null,

            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        })
    }
}
