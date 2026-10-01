import { existsSync, mkdirSync, rename } from 'fs'
import { resolvePathWithinBase, safeBasename } from './safePath'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = safeBasename(imagePath)
    const imagePathTemp = resolvePathWithinBase(from, fileName)
    const imagePathPermanent = resolvePathWithinBase(to, fileName)

    if (!imagePathTemp || !imagePathPermanent) {
        throw new Error('Ошибка при сохранении файла')
    }

    mkdirSync(to, { recursive: true })
    if (!existsSync(imagePathTemp)) {
        throw new Error('Ошибка при сохранении файла')
    }

    rename(imagePathTemp, imagePathPermanent, (err) => {
        if (err) {
            throw new Error('Ошибка при сохранении файла')
        }
    })
}

export default movingFile
