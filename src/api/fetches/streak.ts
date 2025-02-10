import { AXIOS, endpoints } from '@/api'
import { StreakListResponse } from '@/api/types'

export const streak = {
  getStreak: async (): Promise<StreakListResponse> => {
    const response = await AXIOS.get<StreakListResponse>(endpoints.streak.getStreak)
    return response.data
  },
}
