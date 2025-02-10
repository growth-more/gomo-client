// ===================================
// INTEREST
// ===================================

interface CreateInterestRequest {
  name: string
  logo: File
}

interface UpdateInterestRequest {
  name: string
}

interface UpdateInterestLogoRequest {
  updatedLogo: File
}

// ===================================
// MAJOR INTEREST
// ===================================

interface CreateMajorInterestRequest {
  interestId: string
}

interface UpdateMajorInterestOrderRequest {
  updatedOrders: number[]
}

// ===================================
// GRAPH
// ===================================

interface CreateInterestEdgeRequest {
  memeberId: string
  parentInterestId: string
  childInterestId: string
}

export type {
  CreateInterestEdgeRequest,
  CreateInterestRequest,
  CreateMajorInterestRequest,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
  UpdateMajorInterestOrderRequest,
}
