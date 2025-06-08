import { Iconify } from '@/components/iconify'
import { Stack, Typography } from '@mui/material'

interface MottoProps {
  motto: string
}

export function Motto({ motto }: MottoProps) {
  return (
    <Stack width={1} alignItems="center" spacing={1}>
      <Iconify icon="flowbite:quote-solid" width={15} sx={{ color: 'text.secondary' }} />
      <Typography fontSize={15} color="textSecondary">
        {motto}
      </Typography>
    </Stack>
  )
}
