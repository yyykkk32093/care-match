// src/domains/auth/password/domain/event/PasswordSignInSucceededEvent.ts

import { AuthDomainEvent } from '@/domains/auth/_sharedAuth/domain/event/AuthDomainEvent.js'

/**
 * パスワード認証でサインイン成功した際のイベント
 */
export class PasswordSignInSucceededEvent extends AuthDomainEvent {
    readonly outcome = 'SUCCESS' as const
    readonly userId: string
    readonly email: string
    readonly authMethod = 'password' as const
    readonly ipAddress?: string

    constructor(params: {
        userId: string
        email: string
        ipAddress?: string
    }) {
        super('PasswordSignInSucceededEvent', params.userId)
        this.userId = params.userId
        this.email = params.email
        this.ipAddress = params.ipAddress
    }
}
