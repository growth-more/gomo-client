import { CommonErrorMap } from '@/api/error/common-exception'

export const AuthException = {
  // 이메일 존재
  MEMBER_EMAIL_EXIST_EXCEPTION: {
    code: 'AUT-ROO-005',
    message: {
      value: '이미 사용중인 이메일입니다.',
      type: 'warning',
    },
  },

  // 존재하지 않는 계정
  MEMBER_NOT_FOUND_EXCEPTION: {
    code: 'AUT-ROO-006',
    message: {
      value: '존재하지 않는 계정입니다.',
      type: 'warning',
    },
  },

  // 검증된 이메일 jwt 토큰이 유효하지 않음
  INVALID_VERIFIED_EMAIL_TOKEN_EXCEPTION: {
    code: 'AUT-ROO-007',
    message: {
      value: '이메일 인증이 유효하지 않습니다. 다시 인증해주세요.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
