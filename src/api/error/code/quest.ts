export const questCode = {
  THRESHOLD_EXCEEDED: 'QUEST_CREATE_THRESHOLD_EXCEEDED',
  INVALID_PARAMETER: 'QUEST_CREATE_INVALID_PARAMETER',
} as const

export type QuestCode = (typeof questCode)[keyof typeof questCode]
