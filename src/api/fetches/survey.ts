import { AXIOS, endpoints } from '@/api'
import { CreateSurveyAnswerRequest, SurveyQuestionListResponse } from '@/api/types'
import { axiosStatus } from '@/api/utils'

export const survey = {
  getQuestion: async (): Promise<SurveyQuestionListResponse> => {
    return axiosStatus(() => AXIOS.get<SurveyQuestionListResponse>(endpoints.survey.getQuestion), {
      onSuccess: (data) => data,
    })
  },

  createAnswer: async (request: CreateSurveyAnswerRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.post(endpoints.survey.createAnswer, request), {
      onSuccess: (data) => data,
    })
  },
}
