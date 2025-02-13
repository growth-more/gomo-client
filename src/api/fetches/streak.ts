import { AXIOS, endpoints, axiosStatus } from '@/api'
import { StreakListResponse } from '@/api/types'

export const streak = {
  getStreak: async (): Promise<StreakListResponse> => {
    return axiosStatus(() => AXIOS.get<StreakListResponse>(endpoints.streak.getStreak), {
      onSuccess: (data) => data,
    })
  },
}
