import { Button, Stack } from '@mui/material'
import { QuestSettingList } from './components/quest-setting-list'
import { useQuestSetting } from '@/api/hooks'
import { useEffect, useMemo, useState } from 'react'

export function QuestSettingPage() {
  const { questProperty, update } = useQuestSetting()

  const [dailyThreshold, setDailyThreshold] = useState(questProperty.dailyThreshold)
  const [weeklyThreshold, setWeeklyThreshold] = useState(questProperty.weeklyThreshold)
  const [monthlyThreshold, setMonthlyThreshold] = useState(questProperty.monthlyThreshold)

  const updateHandler = () => {
    update({ dailyThreshold, weeklyThreshold, monthlyThreshold })
  }

  const isUpdated = useMemo(() => {
    return (
      dailyThreshold !== questProperty.dailyThreshold ||
      weeklyThreshold !== questProperty.weeklyThreshold ||
      monthlyThreshold !== questProperty.monthlyThreshold
    )
  }, [dailyThreshold, weeklyThreshold, monthlyThreshold, questProperty])

  useEffect(() => {
    setDailyThreshold(questProperty.dailyThreshold)
    setWeeklyThreshold(questProperty.weeklyThreshold)
    setMonthlyThreshold(questProperty.monthlyThreshold)
  }, [questProperty])

  return (
    <Stack spacing={1} p={1}>
      <Stack spacing={1}>
        <QuestSettingList
          title="일일 생성 퀘스트"
          value={dailyThreshold}
          onChange={setDailyThreshold}
        />
        <QuestSettingList
          title="주간 생성 퀘스트"
          value={weeklyThreshold}
          onChange={setWeeklyThreshold}
        />
        <QuestSettingList
          title="월간 생성 퀘스트"
          value={monthlyThreshold}
          onChange={setMonthlyThreshold}
        />
      </Stack>
      <Button variant="contained" disabled={!isUpdated} onClick={updateHandler}>
        수정
      </Button>
    </Stack>
  )
}
