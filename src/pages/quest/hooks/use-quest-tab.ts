import { QuestType } from '@/entities/quest'
import { SyntheticEvent, useState } from 'react'

type QuestTabType = QuestType | 'REPEAT'

const QUEST_TYPE_WITH_LABEL_WITH_REPEAT = [
  {
    value: 'DAILY',
    label: '일일',
  },
  {
    value: 'WEEKLY',
    label: '주간',
  },
  {
    value: 'MONTHLY',
    label: '월간',
  },
  {
    value: 'REPEAT',
    label: '반복',
  },
] as const

const QUEST_TYPE_WITH_LABEL = [
  {
    value: 'DAILY',
    label: '일일',
  },
  {
    value: 'WEEKLY',
    label: '주간',
  },
  {
    value: 'MONTHLY',
    label: '월간',
  },
] as const

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
