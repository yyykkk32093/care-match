// src/domains/_sharedDomains/domain/event/DomainEventBus.ts
import { BaseDomainEvent } from './BaseDomainEvent.js'
import { DomainEventPublisher } from './DomainEventPublisher.js'
import { DomainEventSubscriber } from './DomainEventSubscriber.js'

/**
 * ドメインイベントを発行・購読するためのバス。
 * ジェネリクス T でイベント型を限定できる。
 */
export class DomainEventBus<
    TEvent extends BaseDomainEvent = BaseDomainEvent
> implements DomainEventPublisher {
    private subscribers: DomainEventSubscriber<TEvent>[] = []

    subscribe(subscriber: DomainEventSubscriber<TEvent>) {
        this.subscribers.push(subscriber)
    }

    async publish(event: TEvent) {
        const eventName = event.eventName

        const hits = this.subscribers.filter((s) => {
            const subscribed = s.subscribedTo()

            if (Array.isArray(subscribed)) {
                return subscribed.includes(eventName)
            }
            return subscribed === eventName
        })

        for (const s of hits) {
            await s.handle(event)
        }
    }

    async publishAll(events: TEvent[]): Promise<void> {
        for (const e of events) {
            await this.publish(e)
        }
    }
}

