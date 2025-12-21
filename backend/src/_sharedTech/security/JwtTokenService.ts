import jwt from 'jsonwebtoken'

export class JwtTokenService {
    constructor(private readonly secret: string) { }

    generate(userId: string, email: string): string {
        return jwt.sign(
            {
                sub: userId,
                email: email,
            },
            this.secret,
            { expiresIn: '7d' }
        )
    }

    verify(token: string): any {
        return jwt.verify(token, this.secret)
    }
}
