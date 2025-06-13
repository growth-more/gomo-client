import { useHistory } from '@/api/hooks'
import { Widget } from '@/components/widget'
import { DailyTotalHistoryItem } from '@/views/history/components'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import _ from 'lodash'

export function QuestHistoryWidget1x1() {
  const now = new Date()
  const [year, month] = [now.getFullYear(), now.getMonth() + 1]

  const { dailyTotalHistory } = useHistory(year, month)

  return (
    <Widget width={1} title="퀘스트 기록" subtitle={dayjs(now).format('YYYY년 MM월 DD일')}>
      <Stack p={1}>
        {_(dailyTotalHistory)
          .take(4)
          .map((data, i) => <DailyTotalHistoryItem key={i} {...data} />)
          .value()}
      </Stack>
    </Widget>
  )
}
