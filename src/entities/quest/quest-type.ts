export const QUEST_TYPE = {
  DAILY: {
    label: '일일퀘스트',
    shortLabel: '일일',
    value: 'DAILY',
  },
  WEEKLY: {
    label: '주간퀘스트',
    shortLabel: '주간',
    value: 'WEEKLY',
  },
  MONTHLY: {
    label: '월간퀘스트',
    shortLabel: '월간',
    value: 'MONTHLY',
  },
} as const

export type QuestType = keyof typeof QUEST_TYPE
