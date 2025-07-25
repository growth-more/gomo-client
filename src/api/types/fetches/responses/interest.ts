interface InterestFetchResponse {
  id: string
  registrantId: string
  name: string
  logoUrl: string
  colorCode: string | null
  level: number
  score: number
  scoreThreshold: number
  totalScore: number
}

interface InterestListFetchResponse {
  interests: {
    id: string
    registrantId: string
    name: string
    logoUrl: string
    colorCode: string | null
    level: number
    score: number
    scoreThreshold: number
    totalScore: number
  }[]
}

interface InterestGraphFetchResponse {
  interests: {
    id: string
    registrantId: string
    name: string
    logoUrl: string
    colorCode: string | null
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

export type { InterestFetchResponse, InterestListFetchResponse, InterestGraphFetchResponse }
