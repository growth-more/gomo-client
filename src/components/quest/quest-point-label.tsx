import { Iconify } from '@/components/iconify'
import { alpha, Stack, Typography } from '@mui/material'

interface QuestPointLabelProps {
  icon: string
  point: number
}

export function QuestPointLabel({ icon, point }: QuestPointLabelProps) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      px={1}
      spacing={0.5}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
      borderRadius={1}
      color="white"
    >
      <Iconify icon={icon} width={18} />
      <Typography fontSize={14}>+{point}</Typography>
    </Stack>
  )
}
