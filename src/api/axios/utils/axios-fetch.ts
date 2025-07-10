import { AXIOS } from '@/api/axios/axios'
import { axiosStatus } from '@/api/axios/utils/axios-status'
import { ErrorCode } from '@/api/error'
import { AxiosRequestConfig } from 'axios'

interface AxiosFetchConfig<T, R = T> extends AxiosRequestConfig {
  onSuccess?: (data: T) => R
  on401?: ErrorCode
  onCode?: {
    [code: string]: ErrorCode
  }
}

interface AxiosFetch {
  get<T, R = T>(url: string, config?: AxiosFetchConfig<T, R>): Promise<R>
  post<T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R>
  put<T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R>
  patch<T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R>
  delete<T, R = T>(url: string, config?: AxiosFetchConfig<T, R>): Promise<R>
  postForm<T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R>
  putForm<T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R>
}

export const axiosFetch: AxiosFetch = {
  get: async <T, R = T>(url: string, config?: AxiosFetchConfig<T, R>): Promise<R> => {
    return axiosStatus(() => AXIOS.get<T>(url, config), {
      onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
      onCode: config?.onCode,
      on401: config?.on401,
    })
  },

  post: async <T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R> => {
    return axiosStatus(() => AXIOS.post<T>(url, data, config), {
      onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
      onCode: config?.onCode,
    })
  },

  put: async <T, D, R = T>(url: string, data?: D, config?: AxiosFetchConfig<T, R>): Promise<R> => {
    return axiosStatus(() => AXIOS.put<T>(url, data, config), {
      onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
      onCode: config?.onCode,
    })
  },

  patch: async <T, D, R = T>(
    url: string,
    data?: D,
    config?: AxiosFetchConfig<T, R>
  ): Promise<R> => {
    return axiosStatus(() => AXIOS.patch<T>(url, data, config), {
      onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
      onCode: config?.onCode,
    })
  },

  delete: async <T, R = T>(url: string, config?: AxiosFetchConfig<T, R>): Promise<R> => {
    return axiosStatus(() => AXIOS.delete<T>(url, config), {
      onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
      onCode: config?.onCode,
    })
  },

  postForm: async <T, D, R = T>(
    url: string,
    data?: D,
    config?: AxiosFetchConfig<T, R>
  ): Promise<R> => {
    return axiosStatus(
      () =>
        AXIOS.post<T>(url, data, {
          ...config,
          headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
        onCode: config?.onCode,
      }
    )
  },

  putForm: async <T, D, R = T>(
    url: string,
    data?: D,
    config?: AxiosFetchConfig<T, R>
  ): Promise<R> => {
    return axiosStatus(
      () =>
        AXIOS.put<T>(url, data, {
          ...config,
          headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: (data) => config?.onSuccess?.(data) ?? (data as unknown as R),
        onCode: config?.onCode,
      }
    )
  },
}
