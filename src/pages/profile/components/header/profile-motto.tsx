import { Editable } from '@/components/editable'
import { Iconify } from '@/components/iconify'
import { Stack } from '@mui/material'

interface ProfileMottoProps {
  motto: string
  onEdit: (value: string) => void
}

export function ProfileMotto({ motto, onEdit }: ProfileMottoProps) {
  return (
    <Stack width={1} alignItems="center" spacing={0.5}>
      <Iconify icon="flowbite:quote-solid" width={15} sx={{ color: 'text.secondary' }} />
      <Editable.Text
        value={motto}
        onEdit={onEdit}
        width={1}
        fontSize={14}
        fontWeight={500}
        color="text.secondary"
        textAlign="center"
        textOverflow="ellipsis"
        overflow="hidden"
        noWrap
      />
    </Stack>
  )
}
