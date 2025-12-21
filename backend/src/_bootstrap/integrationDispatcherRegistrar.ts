// src/bootstrap/integrationDispatcherRegistrar.ts
import { IntegrationDispatcher } from '@/integration/dispatcher/IntegrationDispatcher.js'

import { HttpClient } from '@/_sharedTech/http/HttpClient.js'
import { AuditLogIntegrationHandler } from '@/integration/dispatcher/handler/AuditLogIntegrationHandler.js'
// import { NotificationHandler } from '@/domains/...'
// import { BillingHandler } from '@/domains/...'

export class IntegrationDispatcherRegistrar {
    static registerAll(dispatcher: IntegrationDispatcher) {
        dispatcher.register("audit.log", new AuditLogIntegrationHandler(new HttpClient()))
        // dispatcher.register("notify.email", new NotificationHandler())
        // dispatcher.register("billing.charge", new BillingHandler())
    }
}
