// src/domains/auth/password/domain/event/PasswordSignInFailedEvent.ts

import { AuthDomainEvent } from '@/domains/auth/_sharedAuth/domain/event/AuthDomainEvent.js'

/**
 * パスワード認証でサインイン失敗した際のイベント
 */
export class PasswordSignInFailedEvent extends AuthDomainEvent {
    readonly outcome = 'FAILURE' as const
    readonly userId: string
    readonly email: string
    readonly authMethod = 'password' as const
    readonly reason: 'INVALID_CREDENTIALS' | 'LOCKED_ACCOUNT' | 'NOT_FOUND'
    readonly ipAddress?: string

    constructor(params: {
        userId: string
        email: string
        reason: 'INVALID_CREDENTIALS' | 'LOCKED_ACCOUNT' | 'NOT_FOUND'
        ipAddress?: string
    }) {
        super('PasswordSignInFailedEvent', params.userId)
        this.userId = params.userId
        this.email = params.email
        this.reason = params.reason
        this.ipAddress = params.ipAddress
    }
}
