// src/integration/shared/IntegrationSubscriber.ts
import { IntegrationSource } from './IntegrationSource.js'

export interface IntegrationSubscriber {
    subscribedTo(): string | string[]
    handle(event: IntegrationSource): Promise<void> | void
}
