// integration/shared/IntegrationSource.ts
export interface IntegrationSource {
    readonly eventName: string
    readonly occurredAt: Date
}
