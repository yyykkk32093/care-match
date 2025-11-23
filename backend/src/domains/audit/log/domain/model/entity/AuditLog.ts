// src/domains/audit/log/domain/model/entity/AuditLog.ts
export class AuditLog {
    readonly auditLogId: string
    readonly idempotencyKey: string
    readonly eventType: string
    readonly userId: string
    readonly authMethod: string
    readonly detail?: string | null
    readonly occurredAt: Date
    readonly createdAt: Date

    constructor(params: {
        auditLogId?: string
        idempotencyKey: string
        eventType: string
        userId: string
        authMethod: string
        detail?: string | null
        occurredAt?: Date
        createdAt?: Date
    }) {
        this.auditLogId = params.auditLogId ?? crypto.randomUUID()
        this.idempotencyKey = params.idempotencyKey
        this.eventType = params.eventType
        this.userId = params.userId
        this.authMethod = params.authMethod
        this.detail = params.detail ?? null
        this.occurredAt = params.occurredAt ?? new Date()
        this.createdAt = params.createdAt ?? new Date()
    }
}
