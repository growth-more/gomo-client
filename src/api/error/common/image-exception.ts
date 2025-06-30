import { CommonErrorMap } from '@/api/error/common-exception'

export const ImageException = {
  // 이미지 크기 초과
  IMAGE_TOO_LARGE_EXCEPTION: {
    code: 'IMA-ROO-001',
    message: {
      value: '이미지 크기가 너무 큽니다.',
      type: 'warning',
    },
  },

  // 이미지 업로드 중 서버 오류
  IMAGE_UPLOAD_EXCEPTION: {
    code: 'IMA-ROO-002',
    message: {
      value: '이미지 업로드 중 오류가 발생했습니다.',
      type: 'error',
    },
  },

  // 이미지 읽기 중 서버 오류
  IMAGE_READ_EXCEPTION: {
    code: 'IMA-ROO-003',
    message: {
      value: '이미지 읽기 중 오류가 발생했습니다.',
      type: 'error',
    },
  },

  // 이미지 삭제 중 서버 오류
  IMAGE_DELETE_EXCEPTION: {
    code: 'IMA-ROO-004',
    message: {
      value: '이미지 삭제 중 오류가 발생했습니다.',
      type: 'error',
    },
  },
} as const satisfies CommonErrorMap
