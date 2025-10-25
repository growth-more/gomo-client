import { WidgetBasic } from '@/components/widget'
import { DailyTotalAssignQuestHistory } from '@/entities'
import { DailyTotalHistoryItem } from '@/views/history/components'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo } from 'react'

const dailyTotalHistoryData: DailyTotalAssignQuestHistory[] = [
  {
    date: new Date('2025-01-01'),
    dailyCount: 1,
    weeklyCount: 1,
    monthlyCount: 1,
  },
  {
    date: new Date('2025-01-02'),
    dailyCount: 2,
    weeklyCount: 2,
    monthlyCount: 2,
  },
  {
    date: new Date('2025-01-03'),
    dailyCount: 3,
    weeklyCount: 3,
    monthlyCount: 3,
  },
  {
    date: new Date('2025-01-04'),
    dailyCount: 4,
    weeklyCount: 4,
    monthlyCount: 4,
  },
]

export function QuestHistoryWidget1x1Preview() {
  const now = useMemo(() => {
    return new Date()
  }, [])

  return (
    <WidgetBasic
      width={1}
      height={1}
      title="퀘스트 기록"
      subtitle={dayjs(now).format('YYYY년 MM월 DD일')}
    >
      <Stack p={1} height={1}>
        {dailyTotalHistoryData.map((data, i) => (
          <DailyTotalHistoryItem key={i} {...data} />
        ))}
      </Stack>
    </WidgetBasic>
  )
}
