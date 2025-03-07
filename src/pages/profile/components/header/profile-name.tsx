import { Editable } from '@/components/editable'

interface ProfileNameProps {
  name: string
  onEdit: (value: string) => void
}

export function ProfileName({ name, onEdit }: ProfileNameProps) {
  return (
    <Editable.Text
      value={name}
      onEdit={onEdit}
      fontSize={18}
      fontWeight={600}
      inputMaxWidth={200}
      color="text.secondary"
    />
  )
}
