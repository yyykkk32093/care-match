// test/e2e/OutboxWorkerTestRegistrar.ts


import { IntegrationDispatcher } from '@/integration/dispatcher/IntegrationDispatcher.js';
import { OutboxDeadLetterRepository } from '@/integration/outbox/repository/OutboxDeadLetterRepository.js';
import { OutboxRepository } from '@/integration/outbox/repository/OutboxRepository.js';
import { OutboxRetryPolicyRepository } from '@/integration/outbox/repository/OutboxRetryPolicyRepository.js';
import { OutboxWorker } from '@/job/outbox/outboxWorker.js';

export class OutboxWorkerTestRegistrar {
    static createWorker(
        app: any,
        extraHandlers?: (dispatcher: IntegrationDispatcher) => void
    ) {
        const repo = new OutboxRepository();
        const retryRepo = new OutboxRetryPolicyRepository();
        const dlqRepo = new OutboxDeadLetterRepository();

        // ★本番と同じ dispatcher（app の DI 管理下）
        const dispatcher: IntegrationDispatcher = app.get("integrationDispatcher");

        // ★テスト専用の handler をここで追加する（必要なら）
        if (extraHandlers) {
            extraHandlers(dispatcher);
        }

        return new OutboxWorker(repo, retryRepo, dispatcher, dlqRepo);
    }
}
