import { CommonErrorMap } from '@/api/error/common-exception'

export const QuestException = {
  /*
  =========================================
  = 기본
  =========================================
  */

  // 존재하지 않는 퀘스트
  QUEST_NOT_FOUND_EXCEPTION: {
    code: 'ASS-ROO-001',
    message: {
      value: '존재하지 않는 퀘스트입니다.',
      type: 'warning',
    },
  },

  // 퀘스트 접근 권한 없음
  QUEST_ACCESS_DENIED_EXCEPTION: {
    code: 'ASS-ROO-002',
    message: {
      value: '퀘스트 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 수락하지 않은 퀘스트
  QUEST_NOT_CONFIRMED_EXCEPTION: {
    code: 'ASS-ROO-003',
    message: {
      value: '수락하지 않은 퀘스트입니다.',
      type: 'warning',
    },
  },

  // 이미 수락한 퀘스트
  QUEST_ALREADY_CONFIRMED_EXCEPTION: {
    code: 'ASS-ROO-004',
    message: {
      value: '이미 수락한 퀘스트입니다.',
      type: 'warning',
    },
  },

  // 이미 완료한 퀘스트
  QUEST_ALREADY_COMPLETED_EXCEPTION: {
    code: 'ASS-ROO-005',
    message: {
      value: '이미 완료한 퀘스트입니다.',
      type: 'warning',
    },
  },

  // 완료 퀘스트 순서 변경 불가
  COMPLETED_QUEST_ORDER_CHANGE_EXCEPTION: {
    code: 'ASS-ROO-006',
    message: {
      value: '완료한 퀘스트의 순서는 변경할 수 없습니다.',
      type: 'error',
    },
  },

  // 퀘스트 조회 시 잘못된 Period 타입
  INVALID_QUEST_PERIOD_EXCEPTION: {
    code: 'ASS-ROO-007',
    message: {
      value: '잘못된 Period 타입을 사용했습니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 반복 퀘스트
  =========================================
  */

  // 존재하지 않는 반복 퀘스트
  REPEAT_QUEST_NOT_FOUND_EXCEPTION: {
    code: 'REP-ROO-001',
    message: {
      value: '존재하지 않는 반복 퀘스트입니다.',
      type: 'warning',
    },
  },

  // 반복 퀘스트 접근 권한 없음
  REPEAT_QUEST_ACCESS_DENIED_EXCEPTION: {
    code: 'REP-ROO-002',
    message: {
      value: '반복 퀘스트 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 퀘스트 할당량
  =========================================
  */

  // 퀘스트 할당량 초과
  QUEST_QUOTA_EXCEEDED_EXCEPTION: {
    code: 'QUE-ROO-001',
    message: {
      value: '퀘스트 할당량을 초과했습니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 퀘스트 타입
  =========================================
  */

  // 잘못된 퀘스트 타입
  INVALID_QUEST_TYPE_EXCEPTION: {
    code: 'QUE-TYP-001',
    message: {
      value: '잘못된 퀘스트 타입을 사용했습니다.',
      type: 'error',
    },
  },

  // 수정 시 기존 퀘스트 타입과 불일치
  QUEST_TYPE_MISMATCH_EXCEPTION: {
    code: 'QUE-TYP-002',
    message: {
      value: '퀘스트 타입이 불일치합니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 퀘스트 내용
  =========================================
  */

  // 퀘스트 내용 공백
  QUEST_CONTENT_BLANK_EXCEPTION: {
    code: 'QUE-CON-001',
    message: {
      value: '퀘스트 내용을 입력해주세요.',
      type: 'warning',
    },
  },

  // 퀘스트 내용 길이 부족
  QUEST_CONTENT_SHORT_EXCEPTION: {
    code: 'QUE-CON-002',
    message: {
      value: '퀘스트 내용은 최소 3자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 퀘스트 내용 길이 초과
  QUEST_CONTENT_LONG_EXCEPTION: {
    code: 'QUE-CON-003',
    message: {
      value: '퀘스트 내용은 최대 30자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 퀘스트 내용 금지된 문자 포함
  QUEST_CONTENT_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'QUE-CON-004',
    message: {
      value: '퀘스트 내용에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 퀘스트 증명
  =========================================
  */

  // 완료 퀘스트 증명 공백
  COMPLETED_QUEST_PROOF_BLANK_EXCEPTION: {
    code: 'QUE-COM-001',
    message: {
      value: '퀘스트 증명을 입력해주세요.',
      type: 'warning',
    },
  },

  // 완료 퀘스트 증명 길이 초과
  COMPLETED_QUEST_PROOF_LONG_EXCEPTION: {
    code: 'QUE-COM-002',
    message: {
      value: '퀘스트 증명은 최대 512자 이하여야 합니다.',
      type: 'warning',
    },
  },
} as const satisfies CommonErrorMap
