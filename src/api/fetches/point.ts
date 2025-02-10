import { AXIOS, endpoints } from '@/api'
import { PointHistoryListResponse } from '@/api/types'
import { axiosStatus } from '@/api/utils'

export const point = {
  getPointHistory: async (): Promise<PointHistoryListResponse> => {
    return axiosStatus(() => AXIOS.get<PointHistoryListResponse>(endpoints.point.getPointHistory), {
      onSuccess: (data) => data,
    })
  },
}
