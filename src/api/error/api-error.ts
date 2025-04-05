import { ErrorCode } from '@/api/error'

export class ApiError extends Error {
  constructor(code: ErrorCode) {
    super(code)
    this.name = code
  }

  public check(code: ErrorCode): boolean {
    return this.name === code
  }

  static isApiError(err: unknown): err is ApiError {
    return err instanceof ApiError
  }
}
