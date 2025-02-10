// ===================================
// SURVEY ANSWER
// ===================================

interface CreateSurveyAnswerRequest {
  memeberId: string
  survey: {
    questionId: string
    answerId: string
  }[]
}

export type { CreateSurveyAnswerRequest }
