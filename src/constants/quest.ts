import { QuestType } from '@/entities'

const QUEST_TYPE: QuestType[] = ['DAILY', 'WEEKLY', 'MONTHLY'] as const

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

const QUEST_TYPE_LABEL = {
  DAILY: '일일',
  WEEKLY: '주간',
  MONTHLY: '월간',
  REPEAT: '반복',
}

export { QUEST_TYPE, QUEST_TYPE_LABEL, QUEST_TYPE_WITH_LABEL, QUEST_TYPE_WITH_LABEL_WITH_REPEAT }
