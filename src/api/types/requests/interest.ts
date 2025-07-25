// ===================================
// INTEREST
// ===================================

interface CreateInterestRequest {
  name: string
  colorCode: string
  logo?: File | null
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

interface UpdateMajorInterestOrderRequest {
  updatedOrders: number[]
}

// ===================================
// GRAPH
// ===================================

interface CreateInterestEdgeRequest {
  parentInterestId: string
  childInterestId: string
}

export type {
  CreateInterestEdgeRequest,
  CreateInterestRequest,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
  UpdateMajorInterestOrderRequest,
}
