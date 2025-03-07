interface OnEditHandler {
  onSuccess?: () => void
  onError?: () => void
}

interface EditableProps<T> {
  editable?: boolean
  onEdit?: (value: T, handler?: OnEditHandler) => void
}

export type { EditableProps, OnEditHandler }
