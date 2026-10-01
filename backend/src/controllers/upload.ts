import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs/promises'
import { constants } from 'http2'
import sharp from 'sharp'
import BadRequestError from '../errors/bad-request-error'

const MIN_FILE_SIZE = 2 * 1024

const removeUploadedFile = async (filePath: string) => {
    try {
        await unlink(filePath)
    } catch {
        // ignore
    }
}

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }

    const { path: filePath, size } = req.file

    if (size < MIN_FILE_SIZE) {
        await removeUploadedFile(filePath)
        return next(new BadRequestError('Файл слишком маленький'))
    }

    try {
        await sharp(filePath).metadata()
    } catch {
        await removeUploadedFile(filePath)
        return next(new BadRequestError('Некорректное изображение'))
    }

    try {
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
