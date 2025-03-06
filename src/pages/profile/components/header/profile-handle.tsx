import { Editable } from '@/components/editable'

interface ProfileHandleProps {
  handle: string
  onEdit: (value: string) => void
}

export function ProfileHandle({ handle, onEdit }: ProfileHandleProps) {
  return (
    <Editable.Text
      fontSize={12}
      fontWeight={500}
      color="text.secondary"
      value={handle}
      onEdit={onEdit}
      inputMaxWidth={150}
    />
  )
}
