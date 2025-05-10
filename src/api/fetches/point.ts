import { endpoints, axiosFetch } from '@/api'
import { PointHistoryListResponse } from '@/api/types'

export const point = {
  getPointHistory: async (): Promise<PointHistoryListResponse> => {
    return axiosFetch.get(endpoints.point.getPointHistory)
  },
}
