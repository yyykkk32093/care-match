// src/domains/auth/password/application/dto/SignInPasswordUserDTO.ts

export interface SignInPasswordUserInput {
    email: string
    password: string
    ipAddress?: string
}

export interface SignInPasswordUserOutput {
    userId: string
    accessToken: string
}
