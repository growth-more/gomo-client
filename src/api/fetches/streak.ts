import { endpoints, axiosFetch } from '@/api'
import { AchieverResponse, GetStreakFetchRequest, StreakListResponse } from '@/api/types'
import dayjs from 'dayjs'

export const streak = {
  getStreak: async (params: GetStreakFetchRequest): Promise<StreakListResponse> => {
    const startDate = dayjs(params.startDate).format('YYYY-MM-DD')
    const endDate = dayjs(params.endDate).format('YYYY-MM-DD')

    return axiosFetch.get(`${endpoints.streak.getStreak}?startDate=${startDate}&endDate=${endDate}`)
  },

  getAchiever: async (): Promise<AchieverResponse> => {
    return axiosFetch.get(`${endpoints.streak.getAchiever}`)
  },
}
