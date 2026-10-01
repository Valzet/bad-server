import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import mongoose from 'mongoose'
import path from 'path'
import { DB_ADDRESS } from './config'
import { doubleCsrfProtection } from './middlewares/csrf'
import errorHandler from './middlewares/error-handler'
import rateLimiter from './middlewares/rate-limit'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'

const { PORT = 3000, ORIGIN_ALLOW = 'http://localhost' } = process.env
const app = express()

const corsOptions = {
    origin: ORIGIN_ALLOW.split(',').map((item) => item.trim()),
    credentials: true,
}

mongoose.set('sanitizeFilter', true)

app.use(helmet())
app.use(rateLimiter)
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(serveStatic(path.join(__dirname, 'public')))

app.use(urlencoded({ extended: true, limit: '10kb' }))
app.use(json({ limit: '10kb' }))
app.use(mongoSanitize())

app.use((req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        next()
        return
    }
    doubleCsrfProtection(req, res, next)
})

app.options('*', cors(corsOptions))
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
