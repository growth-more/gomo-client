import { Iconify } from '@/components/iconify'
import { QUEST_TYPE, QuestType } from '@/entities/quest'
import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

interface HistoryListItemProps {
  content: string
  questType: QuestType
  interestName: string
  date: Date | null
}

export function HistoryListItem({ content, questType, interestName, date }: HistoryListItemProps) {
  return (
    <Stack
      p={1}
      borderRadius={1}
      sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
    >
      <Typography noWrap>{content}</Typography>
      <Stack direction="row" alignItems="center" divider={<Iconify icon="mdi:dot" width={15} />}>
        <Typography variant="caption">{QUEST_TYPE[questType].label}</Typography>
        <Typography variant="caption">{interestName}</Typography>
        <Typography variant="caption">{dayjs(date).format('HH:mm')} 완료</Typography>
      </Stack>
    </Stack>
  )
}
