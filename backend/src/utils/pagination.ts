export const MAX_PAGE_LIMIT = 50

export function parsePage(value: unknown, fallback = 1): number {
    const page = Number(value)
    return Number.isFinite(page) && page >= 1 ? Math.floor(page) : fallback
}

export function parseLimit(value: unknown, fallback = 10): number {
    const limit = Number(value)
    if (!Number.isFinite(limit) || limit < 1) {
        return fallback
    }
    return Math.min(Math.floor(limit), MAX_PAGE_LIMIT)
}

export function buildSort<T extends string>(
    sortField: unknown,
    sortOrder: unknown,
    allowedFields: readonly T[],
    defaultField: T
): Record<string, 1 | -1> {
    const field =
        typeof sortField === 'string' && allowedFields.includes(sortField as T)
            ? (sortField as T)
            : defaultField
    const order = sortOrder === 'asc' ? 1 : -1
    return { [field]: order }
}
