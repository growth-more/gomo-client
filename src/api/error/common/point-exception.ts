import { CommonErrorMap } from '@/api/error/common-exception'

export const PointException = {
  /*
  =========================================
  = 기본
  =========================================
  */

  // 존재하지 않는 포인트
  POINT_NOT_FOUND_EXCEPTION: {
    code: 'POI-ROO-001',
    message: {
      value: '존재하지 않는 포인트입니다.',
      type: 'warning',
    },
  },

  // 포인트 접근 권한 없음
  POINT_ACCESS_DENIED_EXCEPTION: {
    code: 'POI-ROO-002',
    message: {
      value: '포인트 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 포인트 값 음수
  POINT_NEGATIVE_EXCEPTION: {
    code: 'POI-ROO-003',
    message: {
      value: '포인트 값은 0 이상이어야 합니다.',
      type: 'warning',
    },
  },

  /*
  =========================================
  = 포인트 지갑
  =========================================
  */

  // 포인트 지갑 존재하지 않음
  POINT_WALLET_NOT_FOUND_EXCEPTION: {
    code: 'WAL-ROO-001',
    message: {
      value: '존재하지 않는 포인트 지갑입니다.',
      type: 'warning',
    },
  },

  // 포인트 지갑 접근 권한 없음
  POINT_WALLET_ACCESS_DENIED_EXCEPTION: {
    code: 'WAL-ROO-002',
    message: {
      value: '포인트 지갑 접근 권한이 없습니다.',
      type: 'error',
    },
  },

  // 포인트 잔액 부족
  POINT_BALANCE_INSUFFICIENT_EXCEPTION: {
    code: 'WAL-BAL-001',
    message: {
      value: '포인트 잔액이 부족합니다.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
