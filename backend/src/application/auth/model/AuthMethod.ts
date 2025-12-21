// src/application/auth/model/AuthMethod.ts

/**
 * 認証方式
 *
 * - password : パスワード認証
 * - line     : LINE OAuth
 * - apple    : Apple Sign In
 * - google   : Google OAuth
 */
export type AuthMethod =
    | 'password'
    | 'line'
    | 'apple'
    | 'google'
