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
