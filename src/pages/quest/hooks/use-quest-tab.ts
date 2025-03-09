import { QUEST_TYPE_WITH_LABEL, QUEST_TYPE_WITH_LABEL_WITH_REPEAT } from '@/constants'
import { QuestType } from '@/entities'
import { SyntheticEvent, useState } from 'react'

type QuestTabType = QuestType | 'REPEAT'

export function useQuestTabWithRepeat() {
  const [tab, setTab] = useState<QuestTabType>('DAILY')

  const tabHandler = (e: SyntheticEvent, tab: QuestTabType) => {
    setTab(tab)
  }

  return { tab, tabHandler, tabs: QUEST_TYPE_WITH_LABEL_WITH_REPEAT, setTab }
}

export function useQuestTab() {
  const [tab, setTab] = useState<QuestType>('DAILY')

  const tabHandler = (e: SyntheticEvent, tab: QuestType) => {
    setTab(tab)
  }

  return { tab, tabHandler, tabs: QUEST_TYPE_WITH_LABEL, setTab }
}
