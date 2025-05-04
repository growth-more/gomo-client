import { Iconify } from '@/components/iconify'
import { Stack, Typography } from '@mui/material'

interface InterestGraphIndicatorTagProps {
  tag: string
  isUpper?: boolean
}

export function InterestGraphIndicatorTag({ tag, isUpper }: InterestGraphIndicatorTagProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      p={0.5}
      pr={1}
    >
      <Iconify icon={isUpper ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={16} />
      <Typography fontWeight={400} fontSize={12} color="textSecondary">
        {tag}
      </Typography>
    </Stack>
  )
}
