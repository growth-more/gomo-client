import { SyntheticEvent, useState } from 'react'

const TABS = [
  {
    label: '일일',
    value: 'DAILY',
  },
  {
    label: '주간',
    value: 'WEEKLY',
  },
  {
    label: '월간',
    value: 'MONTHLY',
  },
] as const

type TabType = (typeof TABS)[number]['value']

export function useQuestTab() {
  const [tab, setTab] = useState<TabType>('DAILY')

  const tabHandler = (e: SyntheticEvent, tab: TabType) => {
    setTab(tab)
  }

  return { tab, tabHandler, tabs: TABS }
}
