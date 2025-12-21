import { DomainEventPublisher } from '@/domains/_sharedDomains/domain/event/DomainEventPublisher.js'
import { IIdGenerator } from '@/domains/_sharedDomains/domain/service/IIdGenerator.js'
import { UserId } from '@/domains/_sharedDomains/model/valueObject/UserId.js'
import { Activity } from '@/domains/schedule/activity/domain/model/entity/Activity.js'
import { ActivityDescription } from '@/domains/schedule/activity/domain/model/valueObject/ActivityDescription.js'
import { ActivityId } from '@/domains/schedule/activity/domain/model/valueObject/ActivityId.js'
import { ActivityLocation } from '@/domains/schedule/activity/domain/model/valueObject/ActivityLocation.js'
import { ActivityTimeRange } from '@/domains/schedule/activity/domain/model/valueObject/ActivityTimeRange.js'
import { ActivityTitle } from '@/domains/schedule/activity/domain/model/valueObject/ActivityTitle.js'
import type { IActivityRepository } from '@/domains/schedule/activity/domain/repository/IActivityRepository.js'
import { CreateActivityInput } from '../dto/CreateActivityDTO.js'

export class CreateActivityUseCase {
    constructor(
        private readonly activityRepo: IActivityRepository,
        private readonly eventPublisher: DomainEventPublisher,
        private readonly idGenerator: IIdGenerator
    ) { }

    async execute(input: CreateActivityInput): Promise<Activity> {
        const activity = Activity.create({
            id: ActivityId.create(this.idGenerator.generate()),
            title: ActivityTitle.create(input.title),
            description: ActivityDescription.create(input.description),
            timeRange: ActivityTimeRange.create(input.startAt, input.endAt),
            location: ActivityLocation.create(input.location),
            createdBy: UserId.create(input.createdBy),
        })


        await this.activityRepo.save(activity)
        await this.eventPublisher.publishAll(activity.pullDomainEvents())

        return activity
    }
}
