import { OutboxEvent } from '@/domains/sharedDomains/infrastructure/outbox/OutboxEvent.js'
import crypto from 'crypto'
import { UserLoggedInIntegrationEvent } from '../integration/UserLoggedInIntegrationEvent.js'
import { UserLoginFailedIntegrationEvent } from '../integration/UserLoginFailedIntegrationEvent.js'

export class AuthIntegrationEventMapper {

    map(domainEvent: any): OutboxEvent {

        switch (domainEvent.eventName) {

            case "PasswordUserLoggedInEvent": {
                const integration = new UserLoggedInIntegrationEvent({
                    aggregateId: domainEvent.userId,
                    userId: domainEvent.userId,
                    email: domainEvent.email,
                    authMethod: domainEvent.authMethod,
                    ipAddress: domainEvent.ipAddress,
                })

                return new OutboxEvent({
                    outboxEventId: crypto.randomUUID(),
                    aggregateId: integration.aggregateId,

                    eventName: domainEvent.eventName,
                    eventType: "auth.login.success",
                    routingKey: "audit.log",

                    payload: integration.payload,

                    occurredAt: new Date(),

                    // ★ retry 系はここでセットしない！
                    retryCount: 0,
                    nextRetryAt: new Date(), // とりあえず現時刻。worker が policy に基づいて更新する
                })
            }

            case "PasswordUserLoginFailedEvent": {
                const integration = new UserLoginFailedIntegrationEvent({
                    aggregateId: domainEvent.userId,
                    userId: domainEvent.userId,
                    email: domainEvent.email,
                    reason: domainEvent.reason,
                    authMethod: domainEvent.authMethod,
                    ipAddress: domainEvent.ipAddress,
                })

                return new OutboxEvent({
                    outboxEventId: crypto.randomUUID(),
                    aggregateId: integration.aggregateId,

                    eventName: domainEvent.eventName,
                    eventType: "auth.login.failed",
                    routingKey: "audit.log",

                    payload: integration.payload,

                    occurredAt: new Date(),

                    retryCount: 0,
                    nextRetryAt: new Date(),
                })
            }

            default:
                throw new Error(`Unsupported domain event: ${domainEvent.eventName}`)
        }
    }
}
