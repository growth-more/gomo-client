import { QUEST_STATUS, QuestStatus } from '@/entities/quests'
import { Stack, Typography } from '@mui/material'

interface QuestModalTitleProps {
  questStatus: QuestStatus
  count: number
}

export function QuestModalTitle({ questStatus, count }: QuestModalTitleProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography fontSize={15} fontWeight={600}>
        {QUEST_STATUS[questStatus].label}
      </Typography>
      <Typography
        fontSize={18}
        fontWeight={600}
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {count}개
      </Typography>
    </Stack>
  )
}
