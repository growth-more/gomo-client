import {
  DisplayOrderException,
  ImageException,
  InterestException,
  MemberException,
  PointException,
  QuestException,
  SurveyException,
} from '@/api/error/common'

export interface CommonErrorMessage {
  value: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

export interface CommonErrorCode {
  code: string
  message?: CommonErrorMessage
}

export interface CommonErrorMap {
  [key: string]: CommonErrorCode
}

export const CommonException = {
  ...DisplayOrderException,
  ...ImageException,
  ...InterestException,
  ...MemberException,
  ...PointException,
  ...QuestException,
  ...SurveyException,
} as const satisfies CommonErrorMap

export const CommonExceptionMap = Object.keys(CommonException).reduce((acc, curr) => {
  const key = curr as keyof typeof CommonException
  acc[CommonException[key].code] = CommonException[key]
  return acc
}, {} as Record<string, CommonErrorCode>)
