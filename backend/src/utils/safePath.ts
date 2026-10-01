import path from 'path'

export function resolvePathWithinBase(
    baseDir: string,
    userPath: string
): string | null {
    const normalizedBase = path.resolve(baseDir)
    const resolved = path.resolve(normalizedBase, path.normalize(userPath))

    if (
        resolved !== normalizedBase &&
        !resolved.startsWith(`${normalizedBase}${path.sep}`)
    ) {
        return null
    }

    return resolved
}

export function safeBasename(filePath: string): string {
    return path.basename(filePath.replace(/\\/g, '/'))
}
