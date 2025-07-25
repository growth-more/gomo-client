// ===================================
// INTEREST
// ===================================

interface InterestResponse {
  id: string
  registrantId: string
  name: string
  logoUrl: string
  colorCode: string
  level: number
  score: number
  scoreThreshold: number
  totalScore: number
}

interface InterestListResponse {
  interests: {
    id: string
    registrantId: string
    name: string
    logoUrl: string
    colorCode: string
    level: number
    score: number
    scoreThreshold: number
    totalScore: number
  }[]
}

interface CreateInterestResponse {
  id: string
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
    id: string
    name: string
    logoUrl: string
    level: number
    score: number
    scoreThreshold: number
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
    registrantId: string
    name: string
    logoUrl: string
    colorCode: string
    level: number
    score: number
    scoreThreshold: number
    totalScore: number
  }[]
  relations: {
    id: string
    registrantId: string
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
