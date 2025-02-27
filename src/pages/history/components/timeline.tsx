import { OrganizedAssignQuestHistory } from '@/entities'
import { Stack, Typography } from '@mui/material'
import { TimelineItem } from './timeline-item'
import dayjs from 'dayjs'
import { Iconify } from '@/components/iconify'

interface TimelineProps {
  data: OrganizedAssignQuestHistory[]
}

export function Timeline({ data }: TimelineProps) {
  return (
    <Stack>
      {data.map((e, i) => (
        <Stack key={i}>
          <Stack direction="row" alignItems="center" spacing={1} py={1}>
            <Iconify icon="material-symbols:commit-rounded" sx={{ color: 'text.secondary' }} />
            <Typography fontSize={14} fontWeight={500} color="text.secondary" noWrap>
              {dayjs(e.date).format('YYYY년 MM월 DD일')}
            </Typography>
          </Stack>
          {e.history.map((history, i) => (
            <TimelineItem key={i} data={history} />
          ))}
        </Stack>
      ))}
    </Stack>
  )
}
