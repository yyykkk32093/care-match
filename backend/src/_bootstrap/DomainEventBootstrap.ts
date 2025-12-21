// // src/bootstrap/domainEventBootstrap.ts
// import { authDomainEventBus } from '@/domains/auth/_sharedAuth/domain/event/AuthDomainEventBus.js'
// import { registerAuthDomainSubscribers } from '@/domains/auth/_sharedAuth/domain/event/AuthEventRegistry.js'
// import { OutboxRepository } from '@/integration/outbox/repository/OutboxRepository.js'

// export class DomainEventBootstrap {
//     static bootstrap() {
//         const outboxRepository = new OutboxRepository()

//         // Auth Domain Event
//         registerAuthDomainSubscribers(outboxRepository)

//         // 将来
//         // registerReservationDomainSubscribers(outboxRepository)
//         // registerPaymentDomainSubscribers(outboxRepository)
//     }
// }
