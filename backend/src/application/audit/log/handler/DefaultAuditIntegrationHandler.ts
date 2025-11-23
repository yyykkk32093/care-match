// src/application/audit/log/handler/DefaultAuditIntegrationHandler.ts
import { AuditLog } from '@/domains/audit/log/domain/model/entity/AuditLog.js'

export class DefaultAuditIntegrationHandler {
    handle(event: any): AuditLog {
        return new AuditLog({
            idempotencyKey: event.idempotencyKey,
            eventType: event.eventType,
            userId: String(event.payload.userId ?? 'unknown'),
            authMethod: String(event.payload.authMethod ?? 'unknown'),
            detail: JSON.stringify(event.payload),
            occurredAt: event.occurredAt,
        })
    }
}
