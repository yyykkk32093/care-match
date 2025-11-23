// src/domains/sharedDomains/domain/integration/IOutboxRepository.ts
import { OutboxEvent } from "@/domains/sharedDomains/infrastructure/outbox/OutboxEvent.js"

export interface IOutboxRepository {
    save(event: OutboxEvent): Promise<void>

    findPending(limit?: number): Promise<OutboxEvent[]>

    markAsPublished(outboxEventId: string): Promise<void>

    markAsFailed(outboxEventId: string): Promise<void>

    incrementRetryCount(outboxEventId: string): Promise<void>

    updateNextRetryAt(outboxEventId: string, nextRetryAt: Date): Promise<void>
}
