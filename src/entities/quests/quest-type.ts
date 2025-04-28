export const QUEST_TYPE = {
  DAILY: {
    label: '일일 퀘스트',
    shortLabel: '일일',
  },
  WEEKLY: {
    label: '주간 퀘스트',
    shortLabel: '주간',
  },
  MONTHLY: {
    label: '월간 퀘스트',
    shortLabel: '월간',
  },
} as const

export type QuestType = keyof typeof QUEST_TYPE
