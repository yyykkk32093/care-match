// src/domains/user/domain/model/entity/User.ts

import { AggregateRoot } from '@/domains/_sharedDomains/model/entity/AggregateRoot.js'
import { UserId } from '@/domains/_sharedDomains/model/valueObject/UserId.js'
import { PasswordCredential } from '@/domains/auth/password/domain/model/entity/PasswordCredential.js'
import { AvatarUrl } from '../valueObject/AvatarUrl.js'
import { Biography } from '../valueObject/Biography.js'
import { PhoneNumber } from '../valueObject/PhoneNumber.js'
import { QuietHours, UserNotificationSetting } from '../valueObject/UserNotificationSetting.js'
import { UserRole } from '../valueObject/UserRole.js'

export class User extends AggregateRoot {

    private constructor(
        private readonly id: UserId,
        private displayName: string | null,
        private role: UserRole,
        private email: string | null,
        private phone: PhoneNumber | null,
        private biography: Biography | null,
        private avatarUrl: AvatarUrl | null,
        private notificationSetting: UserNotificationSetting,
        private passwordCredential: PasswordCredential | null,
        private readonly createdAt: Date,
        private updatedAt: Date
    ) {
        super()
    }

    // =====================================================
    // Factory: create（新規作成）
    // =====================================================
    static create(params: {
        id: string
        displayName?: string | null
        role?: UserRole
        email?: string | null
        passwordCredential?: PasswordCredential | null
    }): User {
        return new User(
            UserId.create(params.id),
            params.displayName ?? null,
            params.role ?? UserRole.create('MEMBER'),
            params.email ?? null,
            null,
            null,
            null,
            UserNotificationSetting.create(),
            params.passwordCredential ?? null,
            new Date(),
            new Date()
        )
    }

    // =====================================================
    // Factory: reconstruct（永続化復元）
    // =====================================================
    static reconstruct(params: {
        id: string
        displayName: string | null
        role: string
        email: string | null
        phone: string | null
        biography: string | null
        avatarUrl: string | null
        notification: {
            emailEnabled: boolean
            pushEnabled: boolean
            activityReminderEnabled: boolean
            quietHours: QuietHours | null
        }
        passwordCredential: {
            hashedPassword: string
            createdAt: Date
            updatedAt: Date
        } | null
        createdAt: Date
        updatedAt: Date
    }): User {

        return new User(
            UserId.create(params.id),
            params.displayName,
            UserRole.reconstruct(params.role),
            params.email,
            params.phone ? PhoneNumber.reconstruct(params.phone) : null,
            params.biography ? Biography.reconstruct(params.biography) : null,
            params.avatarUrl ? AvatarUrl.reconstruct(params.avatarUrl) : null,
            UserNotificationSetting.reconstruct(params.notification),

            params.passwordCredential
                ? PasswordCredential.reconstruct({
                    userId: params.id,
                    hashedPassword: params.passwordCredential.hashedPassword,
                    createdAt: params.passwordCredential.createdAt,
                    updatedAt: params.passwordCredential.updatedAt,
                })
                : null,

            params.createdAt,
            params.updatedAt
        )
    }

    // =====================================================
    // Behavior
    // =====================================================

    updateProfile(profile: {
        displayName?: string | null
        email?: string | null
        phone?: string | null
        biography?: string | null
        avatarUrl?: string | null
    }) {
        if (profile.displayName !== undefined) this.displayName = profile.displayName
        if (profile.email !== undefined) this.email = profile.email
        if (profile.phone !== undefined)
            this.phone = profile.phone ? PhoneNumber.create(profile.phone) : null
        if (profile.biography !== undefined)
            this.biography = profile.biography ? Biography.create(profile.biography) : null
        if (profile.avatarUrl !== undefined)
            this.avatarUrl = profile.avatarUrl ? AvatarUrl.create(profile.avatarUrl) : null

        this.updatedAt = new Date()
    }

    updateNotificationSetting(diff: Partial<{
        emailEnabled: boolean
        pushEnabled: boolean
        activityReminderEnabled: boolean
        quietHours: QuietHours | null
    }>) {
        this.notificationSetting = this.notificationSetting.update(diff)
        this.updatedAt = new Date()
    }

    changeRole(newRole: UserRole) {
        this.role = newRole
        this.updatedAt = new Date()
    }

    attachPasswordCredential(credential: PasswordCredential) {
        this.passwordCredential = credential
        this.updatedAt = new Date()
    }

    // =====================================================
    // Getter
    // =====================================================

    getId() { return this.id }
    getDisplayName() { return this.displayName }
    getEmail() { return this.email }
    getPhone() { return this.phone }
    getBiography() { return this.biography }
    getAvatarUrl() { return this.avatarUrl }
    getRole() { return this.role }
    getNotificationSetting() { return this.notificationSetting }
    getPasswordCredential() { return this.passwordCredential }
    getCreatedAt() { return this.createdAt }
    getUpdatedAt() { return this.updatedAt }
}
