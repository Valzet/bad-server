import { RequestHandler } from 'express'
import rateLimit from 'express-rate-limit'

const {
    RATE_LIMITED = 'true',
    RATE_LIMIT_POINTS = '100',
    RATE_LIMIT_DURATION = '60',
} = process.env

const windowMs = Math.max(Number(RATE_LIMIT_DURATION) || 60, 1) * 1000
const max = Math.max(Number(RATE_LIMIT_POINTS) || 100, 1)

const disabledMiddleware: RequestHandler = (_req, _res, next) => next()

const rateLimiter: RequestHandler =
    RATE_LIMITED === 'true'
        ? rateLimit({
              windowMs,
              max,
              standardHeaders: true,
              legacyHeaders: false,
              message: { message: 'Слишком много запросов' },
          })
        : disabledMiddleware

export default rateLimiter
