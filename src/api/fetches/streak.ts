import { AXIOS, endpoints } from '@/api'
import { StreakListResponse } from '@/api/types'
import { axiosStatus } from '@/api/utils'

export const streak = {
  getStreak: async (): Promise<StreakListResponse> => {
    return axiosStatus(() => AXIOS.get<StreakListResponse>(endpoints.streak.getStreak), {
      onSuccess: (data) => data,
    })
  },
}
