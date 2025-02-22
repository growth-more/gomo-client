import { Stack } from '@mui/material'
import { QuestSettingList } from './components/quest-setting-list'
import { useQuestSetting } from '@/api/hooks/use-quest-setting'

export function QuestSettingPage() {
  const { questProperty } = useQuestSetting()

  return (
    <Stack spacing={1} p={1}>
      <QuestSettingList title="일일 생성 퀘스트" value={questProperty.dailyThreshold} />
      <QuestSettingList title="주간 생성 퀘스트" value={questProperty.weeklyThreshold} />
      <QuestSettingList title="월간 생성 퀘스트" value={questProperty.monthlyThreshold} />
    </Stack>
  )
}
