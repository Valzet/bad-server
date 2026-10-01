import { doubleCsrf } from 'csrf-csrf'
import { CookieOptions, Request } from 'express'

const { CSRF_SECRET = 'csrf-secret-dev' } = process.env

const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
}

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => CSRF_SECRET,
    cookieName: '_csrf',
    cookieOptions,
    getSessionIdentifier: (req) => req.ip ?? 'anonymous',
    getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'],
})

export { generateCsrfToken, doubleCsrfProtection }
