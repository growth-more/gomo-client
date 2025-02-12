import { AxiosResponse, isAxiosError } from 'axios'

interface AxiosStatusListener<T, U> {
  onSuccess: (data: T) => U
  on200?: (data: T) => U
  on201?: (data: T) => U
  on204?: (data: T) => U
  on400?: (data: T) => U
  on401?: (data: T) => U
  on403?: (data: T) => U
  on404?: (data: T) => U
  on409?: (data: T) => U
  on500?: (data: T) => U
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
      return listener.on400(error.response.data)
    }
    if (error.response.status === 401 && listener.on401) {
      return listener.on401(error.response.data)
    }
    if (error.response.status === 403 && listener.on403) {
      return listener.on403(error.response.data)
    }
    if (error.response.status === 404 && listener.on404) {
      return listener.on404(error.response.data)
    }
    if (error.response.status === 409 && listener.on409) {
      return listener.on409(error.response.data)
    }
    if (error.response.status === 500 && listener.on500) {
      return listener.on500(error.response.data)
    }
    throw error
  }
}
