// src/application/schedule/activity/usecase/CancelActivityUseCase.ts

import { DomainEventPublisher } from '@/domains/_sharedDomains/domain/event/DomainEventPublisher.js'
import { UserId } from '@/domains/_sharedDomains/model/valueObject/UserId.js'
import { ActivityId } from '@/domains/schedule/activity/domain/model/valueObject/ActivityId.js'
import type { IActivityRepository } from '@/domains/schedule/activity/domain/repository/IActivityRepository.js'
import type { CancelActivityInput } from '../dto/CancelActivityDTO.js'

export class CancelActivityUseCase {
    constructor(
        private readonly activityRepo: IActivityRepository,
        private readonly eventPublisher: DomainEventPublisher
    ) { }

    async execute(input: CancelActivityInput, currentUserId: string): Promise<void> {
        const activity = await this.activityRepo.findById(ActivityId.create(input.id))
        if (!activity) throw new Error('Activity not found')

        activity.cancel(UserId.create(currentUserId))

        await this.activityRepo.save(activity)
        await this.eventPublisher.publishAll(activity.pullDomainEvents())
    }
}
