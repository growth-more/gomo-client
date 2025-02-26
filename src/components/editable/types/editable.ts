interface EditableProps<T> {
  editable?: boolean
  onEdit?: (value: T) => void
}

export type { EditableProps }
