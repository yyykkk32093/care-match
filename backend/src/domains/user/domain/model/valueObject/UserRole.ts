import { ValueObject } from '@/domains/_sharedDomains/model/valueObject/ValueObject.js'

export type UserRoleType = 'MEMBER' | 'ADMIN'

export class UserRole extends ValueObject<UserRoleType> {
    private constructor(value: UserRoleType) {
        super(value)
    }

    static create(value?: string): UserRole {
        const role = (value ?? 'MEMBER').toUpperCase()

        if (role !== 'MEMBER' && role !== 'ADMIN') {
            throw new Error(`Invalid UserRole: ${role}`)
        }
        return new UserRole(role as UserRoleType)
    }

    static reconstruct(value: string): UserRole {
        return UserRole.create(value)
    }

    isAdmin(): boolean {
        return this.getValue() === 'ADMIN'
    }

    isMember(): boolean {
        return this.getValue() === 'MEMBER'
    }
}
