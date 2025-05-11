import { endpoints, axiosFetch } from '@/api'
import { CreateSurveyAnswerRequest, SurveyQuestionListResponse } from '@/api/types'

export const survey = {
  getQuestion: async (): Promise<SurveyQuestionListResponse> => {
    return axiosFetch.get(endpoints.survey.getQuestion)
  },

  createAnswer: async (request: CreateSurveyAnswerRequest): Promise<void> => {
    return axiosFetch.post(endpoints.survey.createAnswer, request)
  },
}
