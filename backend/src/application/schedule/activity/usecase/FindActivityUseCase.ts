import { ActivityId } from '@/domains/schedule/activity/domain/model/valueObject/ActivityId.js'
import type { IActivityRepository } from '@/domains/schedule/activity/domain/repository/IActivityRepository.js'

export class FindActivityUseCase {
    constructor(private readonly activityRepo: IActivityRepository) { }

    async execute(id: string) {
        return this.activityRepo.findById(ActivityId.create(id))
    }
}
