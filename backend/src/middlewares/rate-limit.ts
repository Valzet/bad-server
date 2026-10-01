import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Слишком много запросов' },
})

export default rateLimiter
