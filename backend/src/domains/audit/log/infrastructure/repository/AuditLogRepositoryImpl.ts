// src/domains/audit/log/infrastructure/repository/AuditLogRepositoryImpl.ts
import { prisma } from '@/_sharedTech/db/client.js'
import { AuditLog } from '../../domain/model/entity/AuditLog.js'
import { IAuditLogRepository } from '../../domain/repository/IAuditLogRepository.js'

export class AuditLogRepositoryImpl implements IAuditLogRepository {
    async save(log: AuditLog): Promise<void> {
        await prisma.auditLog.upsert({
            where: { idempotencyKey: log.idempotencyKey },
            update: {}, // 冪等性 → 更新しない
            create: {
                idempotencyKey: log.idempotencyKey,
                id: log.auditLogId,
                eventType: log.eventType,
                userId: log.userId,
                authMethod: log.authMethod,
                detail: log.detail,
                occurredAt: log.occurredAt,
                createdAt: log.createdAt,
            }
        })
    }

    async findByUserId(userId: string): Promise<AuditLog[]> {
        const rows = await prisma.auditLog.findMany({
            where: { userId },
            orderBy: { occurredAt: 'desc' },
        })

        return rows.map(r =>
            new AuditLog({
                auditLogId: r.id,
                idempotencyKey: r.idempotencyKey,
                eventType: r.eventType,
                userId: r.userId,
                authMethod: r.authMethod,
                detail: r.detail,
                occurredAt: r.occurredAt,
                createdAt: r.createdAt,
            })
        )
    }
}
