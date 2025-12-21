// src/application/auth/subscriber/PublishAuthIntegrationSubscriber.ts

import { logger } from '@/_sharedTech/logger/logger.js'
import { AuthIntegrationEventMapper } from '@/integration/auth/mapper/AuthIntegrationEventMapper.js'
import { IntegrationSource } from '@/integration/IntegrationSource.js'
import { IntegrationSubscriber } from '@/integration/IntegrationSubscriber.js'
import { IOutboxRepository } from '@/integration/outbox/repository/IOutboxRepository.js'

export class PublishAuthIntegrationSubscriber
    implements IntegrationSubscriber {

    private readonly mapper = new AuthIntegrationEventMapper()

    constructor(
        private readonly outboxRepository: IOutboxRepository
    ) { }

    subscribedTo(): string[] {
        return [
            'UserLoginSucceededEvent',
            'UserLoginFailedEvent',
            // DomainEvent もここに追加
        ]
    }

    async handle(event: IntegrationSource): Promise<void> {
        logger.info(
            { eventName: event.eventName },
            '[PublishAuthIntegrationSubscriber] IntegrationSource → Outbox'
        )

        const outboxEvent = this.mapper.tryMap(event)
        if (!outboxEvent) return

        await this.outboxRepository.save(outboxEvent)
    }
}
