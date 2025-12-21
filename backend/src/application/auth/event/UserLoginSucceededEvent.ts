// src/application/auth/event/UserLoginSucceededEvent.ts

import { ApplicationEvent } from '@/application/_sharedApplication/event/ApplicationEvent.js'
import { AuthMethod } from '@/application/auth/model/AuthMethod.js'
import { IntegrationSource } from '@/integration/IntegrationSource.js'

/**
 * ユーザーログイン成功（Application Event）
 */
export class UserLoginSucceededEvent extends ApplicationEvent implements IntegrationSource {
    readonly userId: string
    readonly email: string
    readonly method: AuthMethod
    readonly ipAddress?: string

    constructor(params: {
        userId: string
        email: string
        method: AuthMethod
        ipAddress?: string
    }) {
        super('UserLoginSucceededEvent')

        this.userId = params.userId
        this.email = params.email
        this.method = params.method
        this.ipAddress = params.ipAddress
    }
}
