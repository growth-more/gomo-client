import { useQuestSetting } from '@/api/hooks'
import { QuestModalSettingList } from '@/views/quest/modals/main/quest-setting/quest-modal-setting-list'
import { Button, Stack } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export function QuestModalSettingSection() {
  const { questProperty, updateQuestProperty } = useQuestSetting()

  const [dailyThreshold, setDailyThreshold] = useState(questProperty.dailyThreshold)
  const [weeklyThreshold, setWeeklyThreshold] = useState(questProperty.weeklyThreshold)
  const [monthlyThreshold, setMonthlyThreshold] = useState(questProperty.monthlyThreshold)

  const updateHandler = () => {
    updateQuestProperty({ dailyThreshold, weeklyThreshold, monthlyThreshold })
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
    <Stack p={2} spacing={2}>
      <QuestModalSettingList
        title="일일 생성 퀘스트"
        value={dailyThreshold}
        onChange={setDailyThreshold}
      />
      <QuestModalSettingList
        title="주간 생성 퀘스트"
        value={weeklyThreshold}
        onChange={setWeeklyThreshold}
      />
      <QuestModalSettingList
        title="월간 생성 퀘스트"
        value={monthlyThreshold}
        onChange={setMonthlyThreshold}
      />
      <Button variant="contained" onClick={updateHandler} disabled={!isUpdated}>
        설정 저장하기
      </Button>
    </Stack>
  )
}
