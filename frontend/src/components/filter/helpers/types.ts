export interface FieldOption {
    title: string
    value: string | number
}

export type FilterFormValue = string | number | FieldOption

export type FilterFormValues = Record<string, FilterFormValue>
