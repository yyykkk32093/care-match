// src/integration/shared/IntegrationEventBus.ts
import { IntegrationSource } from './IntegrationSource.js'
import { IntegrationSubscriber } from './IntegrationSubscriber.js'

export class IntegrationEventBus {
    private subscribers: IntegrationSubscriber[] = []

    subscribe(subscriber: IntegrationSubscriber) {
        this.subscribers.push(subscriber)
    }

    async publish(event: IntegrationSource) {
        const targets = this.subscribers.filter(s => {
            const sub = s.subscribedTo()
            return Array.isArray(sub)
                ? sub.includes(event.eventName)
                : sub === event.eventName
        })

        for (const t of targets) {
            await t.handle(event)
        }
    }
}
