// src/integration/auth/mapper/AuthIntegrationEventMapper.ts

import { IntegrationSource } from '@/integration/IntegrationSource.js'
import { OutboxEvent } from '@/integration/outbox/model/entity/OutboxEvent.js'
import crypto from 'crypto'

import { UserLoginFailedEvent } from '@/application/auth/event/UserLoginFailedEvent.js'
import { UserLoginSucceededEvent } from '@/application/auth/event/UserLoginSucceededEvent.js'

import { UserLoggedInIntegrationEvent } from '../event/UserLoggedInIntegrationEvent.js'
import { UserLoginFailedIntegrationEvent } from '../event/UserLoginFailedIntegrationEvent.js'

/**
 * Auth Integration Mapper
 *
 * - IntegrationSource（意味のイベント）
 *   → OutboxEvent（配送用レコード）へ変換
 *
 * 📝 DomainEvent が追加されたら
 *   - switch(event.eventName) に case を足す
 *   - Subscriber / UseCase には触らない
 */
export class AuthIntegrationEventMapper {

    tryMap(event: IntegrationSource): OutboxEvent | null {

        switch (event.eventName) {

            // ============================
            // ApplicationEvent: Login Success
            // ============================
            case 'UserLoginSucceededEvent': {
                const e = event as UserLoginSucceededEvent

                const integration = new UserLoggedInIntegrationEvent({
                    aggregateId: e.userId,
                    userId: e.userId,
                    email: e.email,
                    authMethod: e.method,
                    ipAddress: e.ipAddress,
                })

                const payload: Record<string, unknown> = {
                    ...integration.payload,
                }

                return this.createOutboxEvent(
                    e,
                    integration.aggregateId,
                    'auth.login.success',
                    'audit.log',
                    payload
                )
            }

            // ============================
            // ApplicationEvent: Login Failed
            // ============================
            case 'UserLoginFailedEvent': {
                const e = event as UserLoginFailedEvent
                const aggregateId = e.userId ?? 'unknown'

                const integration = new UserLoginFailedIntegrationEvent({
                    aggregateId,
                    userId: aggregateId,
                    email: e.email,
                    authMethod: e.method,
                    reason: e.reason,
                    ipAddress: e.ipAddress,
                })

                const payload: Record<string, unknown> = {
                    ...integration.payload,
                }

                return this.createOutboxEvent(
                    e,
                    aggregateId,
                    'auth.login.failed',
                    'audit.log',
                    payload
                )
            }

            // ============================
            // 📝 DomainEvent が増えたらここに追加
            // ============================
            // case 'UserRegisteredEvent': {
            //     const e = event as UserRegisteredEvent
            //     const payload: Record<string, unknown> = {
            //         userId: e.userId,
            //         email: e.email,
            //     }
            //
            //     return this.createOutboxEvent(
            //         e,
            //         e.userId,
            //         'auth.user.registered',
            //         'audit.log',
            //         payload
            //     )
            // }

            default:
                return null
        }
    }

    // ----------------------------
    // 共通 OutboxEvent 生成
    // ----------------------------
    private createOutboxEvent(
        source: IntegrationSource,
        aggregateId: string,
        eventType: string,
        routingKey: string,
        payload: Record<string, unknown>
    ): OutboxEvent {
        return new OutboxEvent({
            outboxEventId: crypto.randomUUID(),
            aggregateId,
            eventName: source.eventName,
            eventType,
            routingKey,
            payload,
            occurredAt: source.occurredAt,
            retryCount: 0,
            nextRetryAt: new Date(),
        })
    }
}
