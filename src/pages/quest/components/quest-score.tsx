import { Iconify } from '@/components/iconify'
import { alpha, Stack, Typography } from '@mui/material'

interface QuestScoreProps {
  score: number
  icon: string
}

export function QuestScore({ score, icon }: QuestScoreProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      justifyContent="center"
      alignItems="center"
      px={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
      borderRadius={1}
      color="white"
    >
      <Iconify icon={icon} width={18} />
      <Typography fontSize={14}>+{score}</Typography>
    </Stack>
  )
}
