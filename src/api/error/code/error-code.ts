import { questCode, QuestCode } from '@/api/error/code/quest'

export const errorCode = {
  quest: {
    create: {
      THRESHOLD_EXCEEDED: questCode.CREATE_THRESHOLD_EXCEEDED,
      INVALID_PARAMETER: questCode.CREATE_INVALID_PARAMETER,
    },
    update: {
      INVALID_PARAMETER: questCode.UPDATE_INVALID_PARAMETER,
    },
    setting: {
      INVALID_PARAMETER: questCode.SETTING_INVALID_PARAMETER,
    },
    repeat: {
      create: {
        THRESHOLD_EXCEEDED: questCode.REPEAT_CREATE_THRESHOLD_EXCEEDED,
        INVALID_PARAMETER: questCode.REPEAT_CREATE_INVALID_PARAMETER,
      },
      update: {
        INVALID_PARAMETER: questCode.REPEAT_UPDATE_INVALID_PARAMETER,
      },
    },
  },
} as const

export type ErrorCode = QuestCode
