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
  DAILY_REPEAT: {
    label: '일일 반복퀘스트',
    shortLabel: '일일 반복',
    value: 'DAILY_REPEAT',
  },
  WEEKLY_REPEAT: {
    label: '주간 반복퀘스트',
    shortLabel: '주간 반복',
    value: 'WEEKLY_REPEAT',
  },
  MONTHLY_REPEAT: {
    label: '월간 반복퀘스트',
    shortLabel: '월간 반복',
    value: 'MONTHLY_REPEAT',
  },
} as const

export type QuestType = keyof typeof QUEST_TYPE
