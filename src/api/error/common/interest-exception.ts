import { CommonErrorMap } from '@/api/error/common-exception'

export const InterestException = {
  /*
  =========================================
  = 기본
  =========================================
  */

  // 존재하지 않는 관심사
  INTEREST_NOT_FOUND_EXCEPTION: {
    code: 'INT-ROO-001',
    message: {
      value: '존재하지 않는 관심사입니다.',
      type: 'warning',
    },
  },

  // 관심사 접근 권한 없음
  INTEREST_ACCESS_DENIED_EXCEPTION: {
    code: 'INT-ROO-002',
    message: {
      value: '관심사 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 관심사 개수 초과
  INTEREST_COUNT_EXCEEDED_EXCEPTION: {
    code: 'INT-ROO-003',
    message: {
      value: '생성할 수 있는 관심사 개수를 초과했습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 주요 관심사
  =========================================
  */

  // 존재하지 않는 주요 관심사
  MAJOR_INTEREST_NOT_FOUND_EXCEPTION: {
    code: 'MAJ-ROO-001',
    message: {
      value: '존재하지 않는 주요 관심사입니다.',
      type: 'warning',
    },
  },

  // 주요 관심사 접근 권한 없음
  MAJOR_INTEREST_ACCESS_DENIED_EXCEPTION: {
    code: 'MAJ-ROO-002',
    message: {
      value: '관심사 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 이미 등록된 주요 관심사
  MAJOR_INTEREST_DUPLICATED_EXCEPTION: {
    code: 'MAJ-ROO-003',
    message: {
      value: '이미 등록된 주요 관심사입니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 관심사 이름
  =========================================
  */

  // 관심사 이름 공백
  INTEREST_NAME_BLANK_EXCEPTION: {
    code: 'INT-NAM-001',
    message: {
      value: '관심사 이름을 입력해주세요.',
      type: 'warning',
    },
  },

  // 관심사 이름 길이 초과
  INTEREST_NAME_LONG_EXCEPTION: {
    code: 'INT-NAM-002',
    message: {
      value: '관심사 이름은 최대 25자 이하여야 합니다.',
      type: 'warning',
    },
  },

  // 관심사 이름 금지된 문자 포함
  INTEREST_NAME_FORBIDDEN_CHARACTER_EXCEPTION: {
    code: 'INT-NAM-003',
    message: {
      value: '관심사 이름에 사용할 수 없는 문자가 포함되어 있습니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 관심사 전체 숙련도
  =========================================
  */

  // 관심사 전체 숙련도 초과
  INTEREST_TOTAL_SCORE_EXCEEDED_EXCEPTION: {
    code: 'INT-PRO-001',
    message: {
      value: '관심사 전체 숙련도가 최대치를 초과하였습니다.',
      type: 'error',
    },
  },

  // 관심사 전체 숙련도 음수
  INTEREST_TOTAL_SCORE_NEGATIVE_EXCEPTION: {
    code: 'INT-PRO-002',
    message: {
      value: '관심사 전체 숙련도는 0 이상이어야 합니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 관심사 레벨
  =========================================
  */

  // 관심사 레벨 음수
  INTEREST_LEVEL_NEGATIVE_EXCEPTION: {
    code: 'INT-LEV-001',
    message: {
      value: '관심사 레벨은 0 이상이어야 합니다.',
      type: 'error',
    },
  },

  // 관심사 레벨 초과
  INTEREST_LEVEL_EXCEEDED_EXCEPTION: {
    code: 'INT-LEV-002',
    message: {
      value: '관심사 레벨이 최대치를 초과하였습니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 관심사 숙련도 초과
  =========================================
  */

  // 관심사 숙련도 음수
  INTEREST_SCORE_NEGATIVE_EXCEPTION: {
    code: 'INT-SCO-001',
    message: {
      value: '관심사 숙련도는 0 이상이어야 합니다.',
      type: 'error',
    },
  },

  /*
  =========================================
  = 관심사 관계
  =========================================
  */

  // 존재하지 않는 관계
  INTEREST_RELATION_NOT_FOUND_EXCEPTION: {
    code: 'INT-REL-001',
    message: {
      value: '존재하지 않는 관계입니다.',
      type: 'warning',
    },
  },

  // 관계 접근 권한 없음
  INTEREST_RELATION_ACCESS_DENIED_EXCEPTION: {
    code: 'INT-REL-002',
    message: {
      value: '관계 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 이미 등록된 관계
  INTEREST_RELATION_DUPLICATED_EXCEPTION: {
    code: 'INT-REL-003',
    message: {
      value: '이미 등록된 관계입니다.',
      type: 'warning',
    },
  },

  // 관계 사이클 발생
  INTEREST_RELATION_CYCLE_EXCEPTION: {
    code: 'INT-REL-004',
    message: {
      value: '관심사 관계 사이에 사이클이 발생했습니다.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
