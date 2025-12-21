// src/domains/auth/password/domain/event/subscriber/PasswordSignInSucceededSubscriber.ts

import { logger } from '@/_sharedTech/logger/logger.js'
import { DomainEventSubscriber } from '@/domains/_sharedDomains/domain/event/DomainEventSubscriber.js'
import { PasswordSignInSucceededEvent } from '../PasswordSignInSucceededEvent.js'

export class PasswordSignInSucceededSubscriber
    implements DomainEventSubscriber<PasswordSignInSucceededEvent> {
    subscribedTo(): string {
        return 'PasswordSignInSucceededEvent'
    }

    handle(event: PasswordSignInSucceededEvent): void {
        logger.info(
            {
                userId: event.userId,
                email: event.email,
                ipAddress: event.ipAddress,
            },
            `[PasswordSignInSucceededSubscriber] パスワード認証ログイン成功`
        )
    }
}
