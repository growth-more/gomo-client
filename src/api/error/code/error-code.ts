import { interestCode, InterestCode } from '@/api/error/code/interest'
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

  interest: {
    create: {
      INVALID_PARAMETER: interestCode.CREATE_INTEREST_INVALID_PARAMETER,
      IMAGE_TOO_LARGE: interestCode.CREATE_INTEREST_IMAGE_TOO_LARGE,
    },
    update: {
      INVALID_PARAMETER: interestCode.UPDATE_INTEREST_INVALID_PARAMETER,
      IMAGE_TOO_LARGE: interestCode.UPDATE_INTEREST_IMAGE_TOO_LARGE,
    },
    major: {
      DUPLICATED: interestCode.CREATE_MAJOR_INTEREST_DUPLICATED,
    },
  },
} as const

export type ErrorCode = QuestCode | InterestCode
