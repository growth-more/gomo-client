export const QUEST_TYPE = {
  DAILY: {
    label: '일일퀘스트',
    shortLabel: '일일',
    value: 'DAILY',
    apiType: 'DAILY',
  },
  WEEKLY: {
    label: '주간퀘스트',
    shortLabel: '주간',
    value: 'WEEKLY',
    apiType: 'WEEKLY',
  },
  MONTHLY: {
    label: '월간퀘스트',
    shortLabel: '월간',
    value: 'MONTHLY',
    apiType: 'MONTHLY',
  },
  DAILY_REPEAT: {
    label: '일일 반복퀘스트',
    shortLabel: '일일 반복',
    value: 'DAILY_REPEAT',
    apiType: 'DAILY',
  },
  WEEKLY_REPEAT: {
    label: '주간 반복퀘스트',
    shortLabel: '주간 반복',
    value: 'WEEKLY_REPEAT',
    apiType: 'WEEKLY',
  },
  MONTHLY_REPEAT: {
    label: '월간 반복퀘스트',
    shortLabel: '월간 반복',
    value: 'MONTHLY_REPEAT',
    apiType: 'MONTHLY',
  },
} as const

export type QuestType = keyof typeof QUEST_TYPE
export type QuestApiType = (typeof QUEST_TYPE)[keyof typeof QUEST_TYPE]['apiType']
