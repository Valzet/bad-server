export default function hasMongoOperatorKeys(value: unknown): boolean {
    if (value === null || typeof value !== 'object') {
        return false
    }

    if (Array.isArray(value)) {
        return value.some(hasMongoOperatorKeys)
    }

    return Object.entries(value as Record<string, unknown>).some(
        ([key, nested]) => key.startsWith('$') || hasMongoOperatorKeys(nested)
    )
}
