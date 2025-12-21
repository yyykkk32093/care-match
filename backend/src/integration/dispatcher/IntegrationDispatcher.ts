import { logger } from "@/_sharedTech/logger/logger.js"
import { OutboxEvent } from "../outbox/model/entity/OutboxEvent.js"
import { IntegrationHandler } from "./handler/IntegrationHandler.js"
export class IntegrationDispatcher {
    private handlers = new Map<string, IntegrationHandler>()

    register(routingKey: string, handler: IntegrationHandler) {
        this.handlers.set(routingKey, handler)
    }

    async dispatch(routingKey: string, event: OutboxEvent) {
        const handler = this.handlers.get(routingKey)

        if (!handler) {
            logger.warn(
                { eventId: event.outboxEventId, routingKey },
                "No handler found for routingKey"
            )
            return
        }

        return handler.handle(event)
    }
}
