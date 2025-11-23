// src/application/audit/log/handler/AuthLoginSuccessHandler.ts
import { AuditLog } from '@/domains/audit/log/domain/model/entity/AuditLog.js'

export class AuthLoginSuccessHandler {
    handle(event: any): AuditLog {
        return new AuditLog({
            idempotencyKey: event.idempotencyKey,
            eventType: event.eventType,
            userId: String(event.payload.userId),
            authMethod: String(event.payload.authMethod ?? 'password'),
            detail: null,
            occurredAt: event.occurredAt,
        })
    }
}
