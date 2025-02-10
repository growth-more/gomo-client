import { AXIOS, endpoints } from '@/api'
import { CreateSurveyAnswerRequest, SurveyQuestionListResponse } from '@/api/types'

export const survey = {
  getQuestion: async (): Promise<SurveyQuestionListResponse> => {
    const response = await AXIOS.get<SurveyQuestionListResponse>(endpoints.survey.getQuestion)
    return response.data
  },

  createAnswer: async (request: CreateSurveyAnswerRequest): Promise<void> => {
    const response = await AXIOS.post(endpoints.survey.createAnswer, request)
    return response.data
  },
}
