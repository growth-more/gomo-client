import { QuestType } from '@/entities'

const QUEST_TYPE: QuestType[] = ['DAILY', 'WEEKLY', 'MONTHLY'] as const

const QUEST_TYPE_LABEL: { value: QuestType; label: string }[] = [
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

export { QUEST_TYPE, QUEST_TYPE_LABEL }
