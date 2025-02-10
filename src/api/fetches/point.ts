import { AXIOS, endpoints } from '@/api'
import { PointHistoryListResponse } from '@/api/types'

export const point = {
  getPointHistory: async (): Promise<PointHistoryListResponse> => {
    const response = await AXIOS.get<PointHistoryListResponse>(endpoints.point.getPointHistory)
    return response.data
  },
}
