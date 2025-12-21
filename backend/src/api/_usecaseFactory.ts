// src/api/_usecaseFactory.ts
import { ApplicationEventBootstrap } from '@/_bootstrap/ApplicationEventBootstrap.js'
import { JwtTokenService } from '@/_sharedTech/security/JwtTokenService.js'
import { SignInPasswordUserUseCase } from '@/application/auth/password/usecase/SignInPasswordUserUseCase.js'
import { BcryptPasswordHasher } from '@/domains/auth/_sharedAuth/infrastructure/security/BcryptPasswordHasher.js'
import { PasswordCredentialRepositoryImpl } from '@/domains/auth/password/infrastructure/repository/PasswordCredentialRepositoryImpl.js'
import { UserRepositoryImpl } from '@/domains/user/infrastructure/repository/UserRepositoryImpl.js'

export const usecaseFactory = {
    createSignInPasswordUserUseCase() {
        return new SignInPasswordUserUseCase(
            new UserRepositoryImpl(),
            new PasswordCredentialRepositoryImpl(),
            new BcryptPasswordHasher(),
            ApplicationEventBootstrap.getEventBus(),
            new JwtTokenService(process.env.JWT_SECRET ?? 'dev-secret')
        )
    },
}
