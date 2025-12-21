// src/application/_shared/event/ApplicationEventSubscriber.ts
import { ApplicationEvent } from './ApplicationEvent.js'

export interface ApplicationEventSubscriber<
    T extends ApplicationEvent = ApplicationEvent
> {
    subscribedTo(): string | string[]
    handle(event: T): Promise<void> | void
}
