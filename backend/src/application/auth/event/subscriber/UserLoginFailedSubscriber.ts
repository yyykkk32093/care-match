// src/application/auth/subscriber/UserLoginSubscribers.ts
import { logger } from '@/_sharedTech/logger/logger.js'
import { ApplicationEventSubscriber } from '@/application/_sharedApplication/event/ApplicationEventSubscriber.js'
import { UserLoginFailedEvent } from '@/application/auth/event/UserLoginFailedEvent.js'


export class UserLoginFailedSubscriber
    implements ApplicationEventSubscriber<UserLoginFailedEvent> {

    subscribedTo() {
        return 'UserLoginFailedEvent'
    }

    handle(event: UserLoginFailedEvent) {
        logger.warn(
            {
                email: event.email,
                reason: event.reason,
                method: event.method,
                ipAddress: event.ipAddress,
            },
            '[Auth] ログイン失敗'
        )
    }
}
