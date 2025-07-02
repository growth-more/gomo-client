import { CommonErrorMap } from '@/api/error/common-exception'

export const SurveyException = {
  /*
  =========================================
  = 설문 답변
  =========================================
  */

  // 답변 길이 부족
  SURVEY_ANSWER_LENGTH_SHORT_EXCEPTION: {
    code: 'SUR-RES-001',
    message: {
      value: '답변 내용은 최소 20자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 답변 내용 금지된 문자 포함
  SURVEY_ANSWER_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'SUR-RES-002',
    message: {
      value: '답변 내용에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  // 답변 내용 공백
  SURVEY_ANSWER_BLANK_EXCEPTION: {
    code: 'SUR-RES-003',
    message: {
      value: '답변 내용을 입력해주세요.',
      type: 'warning',
    },
  },

  // 옵션 선택 시 답변 내용 입력 불가
  SURVEY_ANSWER_OPTION_SELECTED_EXCEPTION: {
    code: 'SUR-RES-004',
    message: {
      value: '옵션을 선택한 경우 답변 내용을 입력할 수 없습니다.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
