// src/bootstrap/outboxWorkerRegistrar.ts
import { IntegrationDispatcher } from '@/integration/dispatcher/IntegrationDispatcher.js'
import { OutboxDeadLetterRepository } from '@/integration/outbox/repository/OutboxDeadLetterRepository.js'
import { OutboxRepository } from '@/integration/outbox/repository/OutboxRepository.js'
import { OutboxRetryPolicyRepository } from '@/integration/outbox/repository/OutboxRetryPolicyRepository.js'
import { OutboxWorker } from '@/job/outbox/outboxWorker.js'
import { IntegrationDispatcherRegistrar } from './integrationDispatcherRegistrar.js'

export class OutboxWorkerRegistrar {

    static createWorker(): OutboxWorker {
        const repo = new OutboxRepository()
        const retryRepo = new OutboxRetryPolicyRepository()
        const dispatcher = new IntegrationDispatcher()
        const dlqRepo = new OutboxDeadLetterRepository()

        IntegrationDispatcherRegistrar.registerAll(dispatcher)

        return new OutboxWorker(repo, retryRepo, dispatcher, dlqRepo)
    }
}
