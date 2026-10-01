import sanitizeHtml from 'sanitize-html'

export default function sanitizePlainText(dirty: string): string {
    return sanitizeHtml(dirty, {
        allowedTags: [],
        allowedAttributes: {},
    })
}
