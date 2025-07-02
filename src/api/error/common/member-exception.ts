import { CommonErrorMap } from '@/api/error/common-exception'

export const MemberException = {
  /*
  =========================================
  = 기본
  =========================================
  */

  // 존재하지 않는 계정
  MEMBER_NOT_FOUND_EXCEPTION: {
    code: 'MEM-ROO-001',
    message: {
      value: '존재하지 않는 계정입니다.',
      type: 'warning',
    },
  },

  // 계정 접근 권한 없음
  MEMBER_ACCESS_DENIED_EXCEPTION: {
    code: 'MEM-ROO-002',
    message: {
      value: '계정 접근 권한이 없습니다.',
      type: 'warning',
    },
  },

  // 인증 실패
  MEMBER_AUTH_EXCEPTION: {
    code: 'MEM-ROO-003',
    message: {
      value: '아이디 또는 비밀번호가 올바르지 않습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 이메일
  =========================================
  */

  // 이메일 공백
  MEMBER_EMAIL_BLANK_EXCEPTION: {
    code: 'MEM-EMA-001',
    message: {
      value: '이메일을 입력해주세요.',
      type: 'warning',
    },
  },

  // 이메일 길이 부족
  MEMBER_EMAIL_SHORT_EXCEPTION: {
    code: 'MEM-EMA-002',
    message: {
      value: '이메일은 최소 10자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 이메일 길이 초과
  MEMBER_EMAIL_LONG_EXCEPTION: {
    code: 'MEM-EMA-003',
    message: {
      value: '이메일은 최대 254자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 이메일 금지된 문자 포함
  MEMBER_EMAIL_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'MEM-EMA-004',
    message: {
      value: '이메일에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  // 이메일 존재
  MEMBER_EMAIL_EXIST_EXCEPTION: {
    code: 'MEM-EMA-005',
    message: {
      value: '이미 사용중인 이메일입니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 핸들
  =========================================
  */

  // 핸들 공백
  MEMBER_HANDLE_BLANK_EXCEPTION: {
    code: 'MEM-HAN-001',
    message: {
      value: '핸들을 입력해주세요.',
      type: 'warning',
    },
  },

  // 핸들 길이 부족
  MEMBER_HANDLE_SHORT_EXCEPTION: {
    code: 'MEM-HAN-002',
    message: {
      value: '핸들은 최소 3자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 핸들 길이 초과
  MEMBER_HANDLE_LONG_EXCEPTION: {
    code: 'MEM-HAN-003',
    message: {
      value: '핸들은 최대 30자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 핸들 금지된 문자 포함
  MEMBER_HANDLE_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'MEM-HAN-004',
    message: {
      value: '핸들에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  // 핸들 존재
  MEMBER_HANDLE_EXIST_EXCEPTION: {
    code: 'MEM-HAN-005',
    message: {
      value: '이미 사용중인 핸들입니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 이름
  =========================================
  */

  // 이름 공백
  MEMBER_NAME_BLANK_EXCEPTION: {
    code: 'MEM-NAM-001',
    message: {
      value: '이름을 입력해주세요.',
      type: 'warning',
    },
  },

  // 이름 길이 부족
  MEMBER_NAME_SHORT_EXCEPTION: {
    code: 'MEM-NAM-002',
    message: {
      value: '이름은 최소 2자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 이름 길이 초과
  MEMBER_NAME_LONG_EXCEPTION: {
    code: 'MEM-NAM-003',
    message: {
      value: '이름은 최대 20자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 이름 금지된 문자 포함
  MEMBER_NAME_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'MEM-NAM-004',
    message: {
      value: '이름에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 모토
  =========================================
  */

  // 모토 길이 초과
  MEMBER_MOTTO_LONG_EXCEPTION: {
    code: 'MEM-MOT-001',
    message: {
      value: '모토는 최대 200자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 모토 금지된 문자 포함
  MEMBER_MOTTO_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'MEM-MOT-002',
    message: {
      value: '모토에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 비밀번호
  =========================================
  */

  // 비밀번호 공백
  MEMBER_PASSWORD_BLANK_EXCEPTION: {
    code: 'MEM-PAS-001',
    message: {
      value: '비밀번호를 입력해주세요.',
      type: 'warning',
    },
  },

  // 비밀번호 길이 부족
  MEMBER_PASSWORD_SHORT_EXCEPTION: {
    code: 'MEM-PAS-002',
    message: {
      value: '비밀번호는 최소 8자 이상이어야 합니다.',
      type: 'warning',
    },
  },

  // 비밀번호 길이 초과
  MEMBER_PASSWORD_LONG_EXCEPTION: {
    code: 'MEM-PAS-003',
    message: {
      value: '비밀번호는 최대 64자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 비밀번호 금지된 문자 포함
  MEMBER_PASSWORD_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'MEM-PAS-004',
    message: {
      value: '비밀번호에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 활동상태
  =========================================
  */

  // 현재 정지된 계정
  MEMBER_ACTIVATION_STATUS_BLOCKED_EXCEPTION: {
    code: 'MEM-ACT-001',
    message: {
      value: '현재 정지된 계정입니다. 관리자에게 문의해주세요.',
      type: 'warning',
    },
  },

  // 현재 탈퇴한 계정
  MEMBER_ACTIVATION_STATUS_DELETED_EXCEPTION: {
    code: 'MEM-ACT-002',
    message: {
      value: '탈퇴한 계정입니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 퀘스트 속성
  =========================================
  */

  // 퀘스트 임계치 최소값
  MEMBER_QUEST_THRESHOLD_MIN_EXCEPTION: {
    code: 'MEM-QUE-001',
    message: {
      value: '퀘스트 설정값 변경에 실패했습니다.',
      type: 'error',
    },
  },

  // 퀘스트 임계치 최대값
  MEMBER_QUEST_THRESHOLD_MAX_EXCEPTION: {
    code: 'MEM-QUE-002',
    message: {
      value: '퀘스트 설정값 변경에 실패했습니다.',
      type: 'error',
    },
  },

  // 잘못된 퀘스트 타입
  MEMBER_QUEST_TYPE_EXCEPTION: {
    code: 'MEM-QUE-003',
    message: {
      value: '잘못된 퀘스트 타입입니다.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
