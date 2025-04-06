import { ApiError } from '@/api/error'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

interface AxiosStatusListener<T, U> {
  onSuccess: (data: T) => U
  on200?: (data: T) => U
  on201?: (data: T) => U
  on204?: (data: T) => U
  on400?: (data: AxiosError) => ApiError
  on401?: (data: AxiosError) => ApiError
  on403?: (data: AxiosError) => ApiError
  on404?: (data: AxiosError) => ApiError
  on409?: (data: AxiosError) => ApiError
  on422?: (data: AxiosError) => ApiError
  on500?: (data: AxiosError) => ApiError
  onCode?: {
    [code: string]: (data: AxiosError) => ApiError
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
      throw listener.on400(error.response.data)
    }
    if (error.response.status === 401 && listener.on401) {
      throw listener.on401(error.response.data)
    }
    if (error.response.status === 403 && listener.on403) {
      throw listener.on403(error.response.data)
    }
    if (error.response.status === 404 && listener.on404) {
      throw listener.on404(error.response.data)
    }
    if (error.response.status === 409 && listener.on409) {
      throw listener.on409(error.response.data)
    }
    if (error.response.status === 422 && listener.on422) {
      throw listener.on422(error.response.data)
    }
    if (error.response.status === 500 && listener.on500) {
      throw listener.on500(error.response.data)
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
        throw listener.onCode[errorData.code](error)
      }
    }

    throw error
  }
}
