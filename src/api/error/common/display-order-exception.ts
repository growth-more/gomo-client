import { CommonErrorMap } from '@/api/error/common-exception'

export const DisplayOrderException = {
  // 배치 순서 값 음수
  DISPLAY_NEGATIVE_EXCEPTION: {
    code: 'DIS-ROO-001',
  },

  // 배치 순서 증가 값 음수
  DISPLAY_INCREMENT_NEGATIVE_EXCEPTION: {
    code: 'DIS-ROO-002',
  },
} as const satisfies CommonErrorMap
