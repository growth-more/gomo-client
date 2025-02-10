// ===================================
// INTEREST
// ===================================

interface InterestResponse {
  interestId: string
  memberId: string
  level: number
  score: number
  totalScore: number
  name: string
  logoUrl: string
}

interface InterestListResponse {
  interests: {
    interestId: string
    memberId: string
    proficiency: {
      level: number
      score: number
      totalScore: number
    }
    name: string
    logoUrl: string
  }[]
}

interface CreateInterestResponse {
  interestId: string
}

interface RecommendInterestResponse {
  keywords: {
    keyword: string
  }[]
}

// ===================================
// MAJOR INTEREST
// ===================================

interface MajorInterestResponse {
  majorInterests: {
    name: string
    logoUrl: string
    level: number
    score: number
    displayOrder: number
  }[]
}

interface CreateMajorInterestResponse {
  majorInterestId: string
}

// ===================================
// GRAPH
// ===================================

interface InterestGraphResponse {
  interests: {
    id: string
    name: string
    logoUrl: string
    level: number
    score: number
    totalScore: number
  }[]
  edges: {
    id: string
    parentInterestId: string
    childInterestId: string
  }[]
}

interface CreateInterestEdgeResponse {
  interestEdgeId: string
}

export type {
  CreateInterestEdgeResponse,
  CreateInterestResponse,
  CreateMajorInterestResponse,
  InterestGraphResponse,
  InterestListResponse,
  InterestResponse,
  MajorInterestResponse,
  RecommendInterestResponse,
}
