// src/domains/user/domain/model/valueObject/UserNotificationSetting.ts
import { ValueObject } from '@/domains/_sharedDomains/model/valueObject/ValueObject.js'

export interface QuietHours {
    start: string
    end: string
    [key: string]: string
}

export interface UserNotificationSettingProps {
    emailEnabled: boolean
    pushEnabled: boolean
    activityReminderEnabled: boolean
    quietHours: QuietHours | null
    [key: string]: any
}

export class UserNotificationSetting extends ValueObject<UserNotificationSettingProps> {

    private constructor(props: UserNotificationSettingProps) {
        super(props)
    }

    static create(props?: Partial<UserNotificationSettingProps>): UserNotificationSetting {
        return new UserNotificationSetting({
            emailEnabled: props?.emailEnabled ?? true,
            pushEnabled: props?.pushEnabled ?? true,
            activityReminderEnabled: props?.activityReminderEnabled ?? true,
            quietHours: props?.quietHours ?? null,
        })
    }

    static reconstruct(props: UserNotificationSettingProps) {
        return new UserNotificationSetting(props)
    }

    /** Prisma JSON として保存するための serialize */
    toPrimitive(): UserNotificationSettingProps {
        return { ...this.getValue() }
    }

    /** immutable update */
    update(diff: Partial<UserNotificationSettingProps>): UserNotificationSetting {
        return new UserNotificationSetting({
            ...this.getValue(),
            ...diff,
        })
    }

    get emailEnabled() { return this.getValue().emailEnabled }
    get pushEnabled() { return this.getValue().pushEnabled }
    get activityReminderEnabled() { return this.getValue().activityReminderEnabled }
    get quietHours() { return this.getValue().quietHours }
}
