import { ApiError, ErrorCode } from '@/api/error'
import { AxiosResponse, isAxiosError } from 'axios'

interface AxiosStatusListener<T, U> {
  onSuccess: (data: T) => U
  on200?: (data: T) => U
  on201?: (data: T) => U
  on204?: (data: T) => U
  on400?: ErrorCode
  on401?: ErrorCode
  on403?: ErrorCode
  on404?: ErrorCode
  on409?: ErrorCode
  on422?: ErrorCode
  on500?: ErrorCode
  onCode?: {
    [code: string]: ErrorCode
  }
}

export async function axiosStatus<T, U>(
  query: () => Promise<AxiosResponse<T>>,
  listener: AxiosStatusListener<T, U>
): Promise<U> {
  try {
    const response = await query()

    if (response.status === 200 && listener.on200) {
      return listener.on200(response.data)
    }
    if (response.status === 201 && listener.on201) {
      return listener.on201(response.data)
    }
    if (response.status === 204 && listener.on204) {
      return listener.on204(response.data)
    }
    return listener.onSuccess(response.data)
  } catch (error) {
    if (!isAxiosError(error)) {
      throw error
    }
    if (!error.response) {
      throw error
    }

    if (error.response.status === 400 && listener.on400) {
      throw new ApiError(listener.on400)
    }
    if (error.response.status === 401 && listener.on401) {
      throw new ApiError(listener.on401)
    }
    if (error.response.status === 403 && listener.on403) {
      throw new ApiError(listener.on403)
    }
    if (error.response.status === 404 && listener.on404) {
      throw new ApiError(listener.on404)
    }
    if (error.response.status === 409 && listener.on409) {
      throw new ApiError(listener.on409)
    }
    if (error.response.status === 422 && listener.on422) {
      throw new ApiError(listener.on422)
    }
    if (error.response.status === 500 && listener.on500) {
      throw new ApiError(listener.on500)
    }

    if (listener.onCode && error.response.data) {
      if (typeof error.response.data !== 'object') {
        throw error
      }
      const errorData = error.response.data as Record<string, unknown>
      if (typeof errorData.code !== 'string') {
        throw error
      }
      if (listener.onCode[errorData.code]) {
        throw new ApiError(listener.onCode[errorData.code])
      }
    }

    throw error
  }
}
