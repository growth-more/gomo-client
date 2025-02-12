import { AXIOS, endpoints, axiosStatus } from '@/api'
import { PointHistoryListResponse } from '@/api/types'

export const point = {
  getPointHistory: async (): Promise<PointHistoryListResponse> => {
    return axiosStatus(() => AXIOS.get<PointHistoryListResponse>(endpoints.point.getPointHistory), {
      onSuccess: (data) => data,
    })
  },
}
