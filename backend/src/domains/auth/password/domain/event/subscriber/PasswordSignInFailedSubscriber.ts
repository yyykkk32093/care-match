// src/domains/auth/password/domain/event/subscriber/PasswordSignInFailedSubscriber.ts

import { logger } from '@/_sharedTech/logger/logger.js'
import { DomainEventSubscriber } from '@/domains/_sharedDomains/domain/event/DomainEventSubscriber.js'
import { PasswordSignInFailedEvent } from '../PasswordSignInFailedEvent.js'

export class PasswordSignInFailedSubscriber
    implements DomainEventSubscriber<PasswordSignInFailedEvent> {
    subscribedTo(): string {
        return 'PasswordSignInFailedEvent'
    }

    handle(event: PasswordSignInFailedEvent): void {
        logger.warn(
            {
                userId: event.userId,
                email: event.email,
                reason: event.reason,
                ipAddress: event.ipAddress,
            },
            `[PasswordSignInFailedSubscriber] パスワード認証ログイン失敗`
        )
    }
}
