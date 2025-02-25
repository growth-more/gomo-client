import { QUEST_TYPE_LABEL } from '@/constants'
import { QuestType } from '@/entities'
import { SyntheticEvent, useState } from 'react'

export function useQuestTab() {
  const [tab, setTab] = useState<QuestType>('DAILY')

  const tabHandler = (e: SyntheticEvent, tab: QuestType) => {
    setTab(tab)
  }

  return { tab, tabHandler, tabs: QUEST_TYPE_LABEL, setTab }
}
