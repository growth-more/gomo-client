// ===================================
// SURVEY QUESTION
// ===================================

interface SurveyQuestionListResponse {
  questions: {
    surveyQuestionId: string
    questionSelectType: string
    isRequired: boolean
    content: string
    items: {
      surveyItemId: string
      content: string
      displayOrder: number
    }[]
  }[]
}

export type { SurveyQuestionListResponse }
