export class OutboxRetryPolicy {
    readonly routingKey: string
    readonly maxRetries: number
    readonly retryInterval: number
    readonly maxInterval: number

    constructor(params: {
        routingKey: string
        maxRetries: number
        retryInterval: number
        maxInterval: number
    }) {
        this.routingKey = params.routingKey
        this.maxRetries = params.maxRetries
        this.retryInterval = params.retryInterval
        this.maxInterval = params.maxInterval
    }
}
