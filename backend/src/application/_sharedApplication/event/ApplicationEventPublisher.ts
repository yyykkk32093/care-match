// src/application/_sharedApplication/event/ApplicationEventPublisher.ts
import { ApplicationEvent } from './ApplicationEvent.js'

export interface ApplicationEventPublisher {
    publish(event: ApplicationEvent): Promise<void>
}
