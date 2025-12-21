// src/application/auth/subscriber/UserLoginSubscribers.ts
import { logger } from '@/_sharedTech/logger/logger.js'
import { ApplicationEventSubscriber } from '@/application/_sharedApplication/event/ApplicationEventSubscriber.js'
import { UserLoginSucceededEvent } from '@/application/auth/event/UserLoginSucceededEvent.js'

export class UserLoginSucceededSubscriber
    implements ApplicationEventSubscriber<UserLoginSucceededEvent> {

    subscribedTo() {
        return 'UserLoginSucceededEvent'
    }

    handle(event: UserLoginSucceededEvent) {
        logger.info(
            {
                userId: event.userId,
                email: event.email,
                method: event.method,
                ipAddress: event.ipAddress,
            },
            '[Auth] ログイン成功'
        )
    }
}
