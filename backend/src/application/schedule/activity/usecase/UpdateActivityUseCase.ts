import { DomainEventPublisher } from "@/domains/_sharedDomains/domain/event/DomainEventPublisher.js"
import { ActivityDescription } from "@/domains/schedule/activity/domain/model/valueObject/ActivityDescription.js"
import { ActivityId } from "@/domains/schedule/activity/domain/model/valueObject/ActivityId.js"
import { ActivityLocation } from "@/domains/schedule/activity/domain/model/valueObject/ActivityLocation.js"
import { ActivityTimeRange } from "@/domains/schedule/activity/domain/model/valueObject/ActivityTimeRange.js"
import { ActivityTitle } from "@/domains/schedule/activity/domain/model/valueObject/ActivityTitle.js"
import { IActivityRepository } from "@/domains/schedule/activity/domain/repository/IActivityRepository.js"
import { UpdateActivityInput } from "../dto/UpdateActivityDTO.js"

export class UpdateActivityUseCase {
    constructor(
        private readonly activityRepo: IActivityRepository,
        private readonly eventPublisher: DomainEventPublisher
    ) { }

    async execute(input: UpdateActivityInput) {
        const activity = await this.activityRepo.findById(ActivityId.create(input.id))
        if (!activity) throw new Error("Activity not found")

        activity.updateDetails({
            title: input.title !== undefined ? ActivityTitle.create(input.title) : undefined,
            description: input.description !== undefined ? ActivityDescription.create(input.description) : undefined,
            timeRange: input.startAt && input.endAt
                ? ActivityTimeRange.create(input.startAt, input.endAt)
                : undefined,
            location: input.location !== undefined ? ActivityLocation.create(input.location) : undefined,
        })


        await this.activityRepo.save(activity)
        await this.eventPublisher.publishAll(activity.pullDomainEvents())
    }
}
