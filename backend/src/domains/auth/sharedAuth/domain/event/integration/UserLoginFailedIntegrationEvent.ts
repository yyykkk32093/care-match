// src/domains/auth/sharedAuth/event/integration/UserLoginFailedIntegrationEvent.ts

export class UserLoginFailedIntegrationEvent {
    readonly aggregateId: string

    readonly eventType = "auth.login.failed"
    readonly routingKey = "audit.log"

    readonly payload: {
        userId: string
        email?: string
        authMethod: string
        reason: string
        ipAddress?: string
    }

    constructor(params: {
        aggregateId: string
        userId: string
        email?: string
        authMethod: string
        reason: string
        ipAddress?: string
    }) {
        this.aggregateId = params.aggregateId

        this.payload = {
            userId: params.userId,
            email: params.email,
            authMethod: params.authMethod,
            reason: params.reason,
            ipAddress: params.ipAddress,
        }
    }
}
