import { RequestHandler } from 'express'
import BadRequestError from '../errors/bad-request-error'
import hasMongoOperatorKeys from '../utils/hasMongoOperatorKeys'

const rejectMongoQuery: RequestHandler = (req, _res, next) => {
    if (hasMongoOperatorKeys(req.query)) {
        next(new BadRequestError('Недопустимые параметры запроса'))
        return
    }
    next()
}

export default rejectMongoQuery
