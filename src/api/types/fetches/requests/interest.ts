import {
  CreateInterestEdgeRequest,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
  UpdateMajorInterestOrderRequest,
} from '@/api/types'

// ===================================
// INTEREST
// ===================================

interface GetInterestFetchRequest {
  id: string
}

interface CreateInterestFetchRequest {
  body: CreateInterestEdgeRequest
}

interface UpdateInterestFetchRequest {
  body: UpdateInterestRequest
  id: string
}

interface UpdateInterestLogoFetchRequest {
  body: UpdateInterestLogoRequest
  id: string
}

interface DeleteInterestFetchRequest {
  id: string
}

// ===================================
// MAJOR INTEREST
// ===================================

interface CreateMajorInterestFetchRequest {
  id: string
}

interface UpdateMajorInterestOrderFetchRequest {
  body: UpdateMajorInterestOrderRequest
}

interface DeleteMajorInterestFetchRequest {
  id: string
}

// ===================================
// GRAPH
// ===================================

interface CreateInterestEdgeFetchRequest {
  body: CreateInterestEdgeRequest
}

interface DeleteInterestEdgeFetchRequest {
  id: string
}

export type {
  CreateInterestEdgeFetchRequest,
  CreateInterestFetchRequest,
  CreateMajorInterestFetchRequest,
  DeleteInterestEdgeFetchRequest,
  DeleteInterestFetchRequest,
  DeleteMajorInterestFetchRequest,
  GetInterestFetchRequest,
  UpdateInterestFetchRequest,
  UpdateInterestLogoFetchRequest,
  UpdateMajorInterestOrderFetchRequest,
}
