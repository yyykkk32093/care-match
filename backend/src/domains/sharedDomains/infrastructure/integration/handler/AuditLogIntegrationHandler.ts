import { HttpClient } from "@/sharedTech/http/HttpClient.js"
import { logger } from "@/sharedTech/logger/logger.js"
import { OutboxEvent } from "../../outbox/OutboxEvent.js"
import { IntegrationHandler } from "./IntegrationHandler.js"

export class AuditLogIntegrationHandler extends IntegrationHandler {
    private readonly http = new HttpClient()
    private readonly endpoint =
        `${process.env.AUDIT_API_BASE_URL}/integration/v1/audit/logs`

    async handle(event: OutboxEvent): Promise<void> {
        logger.info(
            { eventId: event.outboxEventId, endpoint: this.endpoint },
            "Sending integration event to AuditLog API"
        )

        const dto = {
            eventType: event.eventType,
            payload: event.payload,
            occurredAt: event.occurredAt.toISOString(),
        }

        await this.http.post(this.endpoint, dto)
    }
}
