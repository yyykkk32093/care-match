// src/domains/auth/sharedAuth/event/integration/UserLoggedInIntegrationEvent.ts

export class UserLoggedInIntegrationEvent {
    readonly aggregateId: string

    readonly eventType = "auth.login.success"
    readonly routingKey = "audit.log"

    readonly payload: {
        userId: string
        email?: string
        authMethod: string
        ipAddress?: string
    }

    constructor(params: {
        aggregateId: string
        userId: string
        email?: string
        authMethod: string
        ipAddress?: string
    }) {
        this.aggregateId = params.aggregateId

        this.payload = {
            userId: params.userId,
            email: params.email,
            authMethod: params.authMethod,
            ipAddress: params.ipAddress,
        }
    }
}
