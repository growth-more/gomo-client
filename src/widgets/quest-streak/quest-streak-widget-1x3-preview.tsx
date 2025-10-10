import { CalendarHeatmap } from '@/components/heatmap'
import { WidgetBasic } from '@/components/widget'
import { Achievement, OrganizedStreak } from '@/entities'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'

const streakData: OrganizedStreak = {
  all: [],
  daily: [],
  weekly: [],
  monthly: [],
}

const achievementData: Achievement = {
  longestStreakDays: 725,
  currentStreakDays: 74,
}

export function QuestStreakWidget1x3Preview() {
  const endDate = dayjs().endOf('day').toDate()

  return (
    <WidgetBasic
      width={3}
      title="퀘스트 연속 기록"
      subtitle={`${achievementData.currentStreakDays}일 연속 퀘스트 진행중`}
    >
      <Stack width={1} height={1} justifyContent="center" alignItems="center">
        <CalendarHeatmap data={streakData.daily} endDate={endDate} type="DAILY" cellSize={17} />
      </Stack>
    </WidgetBasic>
  )
}
