// test/e2e/eventSubscribersRegistrarForTest.ts
import { AuditLogIntegrationHandler } from '@/integration/dispatcher/handler/AuditLogIntegrationHandler.js'
import { IntegrationDispatcher } from '@/integration/dispatcher/IntegrationDispatcher.js'
import { FakeHttpClient } from './FakeHttpClient.js'

export class EventTestRegistrar {
    static registerAll(app: any) {
        const dispatcher: IntegrationDispatcher =
            app.get("integrationDispatcher")

        dispatcher.register(
            "audit.log",
            new AuditLogIntegrationHandler(new FakeHttpClient(app))
        )
    }
}
