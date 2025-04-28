import { QUEST_STATUS, QuestStatus } from '@/entities/quests'
import { Stack, Typography } from '@mui/material'

interface QuestModalTitleProps {
  questType: QuestStatus
  count: number
}

export function QuestModalTitle({ questType, count }: QuestModalTitleProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography fontSize={15} fontWeight={600}>
        {QUEST_STATUS[questType].label}
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
