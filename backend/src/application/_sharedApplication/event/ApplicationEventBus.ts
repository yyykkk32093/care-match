// src/application/_sharedApplication/event/ApplicationEventBus.ts
import { logger } from '@/_sharedTech/logger/logger.js'
import { ApplicationEvent } from './ApplicationEvent.js'
import { ApplicationEventPublisher } from './ApplicationEventPublisher.js'
import { ApplicationEventSubscriber } from './ApplicationEventSubscriber.js'

export class ApplicationEventBus implements ApplicationEventPublisher {
    private subscribers: ApplicationEventSubscriber<ApplicationEvent>[] = []

    subscribe(subscriber: ApplicationEventSubscriber<ApplicationEvent>) {
        this.subscribers.push(subscriber)
    }

    async publish(event: ApplicationEvent): Promise<void> {
        logger.info({ eventName: event.eventName }, 'EventBus: イベントを発行します')

        const name = event.eventName

        const targets = this.subscribers.filter((s) => {
            const sub = s.subscribedTo()
            return Array.isArray(sub) ? sub.includes(name) : sub === name
        })

        for (const t of targets) {
            // Subscriber 側の型Tに対してはここで整合が取れないので
            // eventは ApplicationEvent として渡す（必要なら subscriber 側で型ガード）
            await t.handle(event)
        }
    }
}
