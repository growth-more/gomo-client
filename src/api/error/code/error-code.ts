import { questCode, QuestCode } from '@/api/error/code/quest'

export const errorCode = {
  quest: {
    create: {
      THRESHOLD_EXCEEDED: questCode.THRESHOLD_EXCEEDED,
      INVALID_PARAMETER: questCode.INVALID_PARAMETER,
    },
  },
} as const

export type ErrorCode = QuestCode
