// src/domains/_sharedDomains/infrastructure/retryPolicy/OutboxRetryPolicyRepository.ts

import { prisma } from "@/_sharedTech/db/client.js"

export interface RetryPolicy {
    routingKey: string
    maxRetries: number
    baseInterval: number
    maxInterval: number
}

export class OutboxRetryPolicyRepository {
    async findByRoutingKey(routingKey: string): Promise<RetryPolicy> {
        const row = await prisma.outboxRetryPolicy.findUnique({
            where: { routingKey },
        })

        if (!row) {
            throw new Error(`RetryPolicy not found for routingKey=${routingKey}`)
        }

        return {
            routingKey: row.routingKey,
            maxRetries: row.maxRetries,
            baseInterval: row.baseInterval,
            maxInterval: row.maxInterval,
        }
    }
}
