import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { resolvePathWithinBase } from '../utils/safePath'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const filePath = resolvePathWithinBase(baseDir, req.path)

        if (!filePath) {
            return next()
        }

        fs.access(filePath, fs.constants.F_OK, (accessError) => {
            if (accessError) {
                return next()
            }
            return res.sendFile(filePath, (sendError) => {
                if (sendError) {
                    next(sendError)
                }
            })
        })
    }
}
