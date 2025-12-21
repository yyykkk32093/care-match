import type { IActivityRepository } from '@/domains/schedule/activity/domain/repository/IActivityRepository.js'

export class ListActivitiesUseCase {
    constructor(private readonly activityRepo: IActivityRepository) { }

    async execute() {
        return this.activityRepo.findAll()
    }
}
