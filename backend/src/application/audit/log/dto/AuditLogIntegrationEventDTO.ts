// src/application/audit/log/dto/AuditLogIntegrationEventDTO.ts
export class AuditLogIntegrationEventDTO {
    readonly idempotencyKey: string
    readonly eventType: string
    readonly payload: Record<string, unknown>
    readonly occurredAt: Date

    constructor(props: {
        idempotencyKey: string
        eventType: string
        payload: any
        occurredAt: Date
    }) {
        this.idempotencyKey = props.idempotencyKey
        this.eventType = props.eventType
        this.payload = props.payload
        this.occurredAt = props.occurredAt
    }

    static fromRaw(raw: any) {
        return new AuditLogIntegrationEventDTO({
            idempotencyKey: raw.idempotencyKey,
            eventType: raw.eventType,
            payload: raw.payload,
            occurredAt: new Date(raw.occurredAt),
        })
    }
}
