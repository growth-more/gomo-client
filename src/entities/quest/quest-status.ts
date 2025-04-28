export const QUEST_STATUS = {
  UNCONFIRMED: {
    label: '시작 가능한 퀘스트',
    shortLabel: '시작가능',
  },
  CONFIRMED: {
    label: '진행중인 퀘스트',
    shortLabel: '진행중',
  },
  COMPLETED: {
    label: '완료한 퀘스트',
    shortLabel: '완료',
  },
} as const

export type QuestStatus = keyof typeof QUEST_STATUS
