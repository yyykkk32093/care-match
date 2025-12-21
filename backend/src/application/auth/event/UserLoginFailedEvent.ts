// src/application/auth/event/UserLoginFailedEvent.ts

import { ApplicationEvent } from '@/application/_sharedApplication/event/ApplicationEvent.js'
import { AuthMethod } from '@/application/auth/model/AuthMethod.js'
import { IntegrationSource } from '@/integration/IntegrationSource.js'

/**
 * ユーザーログイン失敗（Application Event）
 *
 * - 認証方式ごとの失敗（password / line / google / apple）
 * - userId は特定できない場合があるため optional
 */
export class UserLoginFailedEvent extends ApplicationEvent implements IntegrationSource {
    readonly email: string
    readonly reason: string
    readonly method: AuthMethod
    readonly userId?: string
    readonly ipAddress?: string

    constructor(params: {
        email: string
        reason: string
        method: AuthMethod
        userId?: string
        ipAddress?: string
    }) {
        super('UserLoginFailedEvent')
        this.email = params.email
        this.reason = params.reason
        this.method = params.method
        this.userId = params.userId
        this.ipAddress = params.ipAddress
    }
}
