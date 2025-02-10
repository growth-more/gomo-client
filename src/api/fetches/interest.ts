import { AXIOS, endpoints } from '@/api'
import {
  CreateInterestEdgeRequest,
  CreateInterestEdgeResponse,
  CreateInterestRequest,
  CreateInterestResponse,
  CreateMajorInterestRequest,
  CreateMajorInterestResponse,
  InterestGraphResponse,
  InterestListResponse,
  InterestResponse,
  MajorInterestResponse,
  RecommendInterestResponse,
  UpdateInterestLogoRequest,
  UpdateInterestRequest,
  UpdateMajorInterestOrderRequest,
} from '@/api/types'

export const interest = {
  create: async (request: CreateInterestRequest): Promise<CreateInterestResponse> => {
    const response = await AXIOS.post<CreateInterestResponse>(endpoints.interest.create, request)
    return response.data
  },

  get: async (id: string): Promise<InterestResponse> => {
    const response = await AXIOS.get<InterestResponse>(endpoints.interest.getWithId(id))
    return response.data
  },

  list: async (): Promise<InterestListResponse> => {
    const response = await AXIOS.get<InterestListResponse>(endpoints.interest.get)
    return response.data
  },

  update: async (request: UpdateInterestRequest, id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.interest.updateWithId(id), request)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    const response = await AXIOS.delete(endpoints.interest.deleteWithId(id))
    return response.data
  },

  updateLogo: async (request: UpdateInterestLogoRequest, id: string): Promise<void> => {
    const response = await AXIOS.put(endpoints.interest.updateLogoWithId(id), request)
    return response.data
  },

  getGraph: async (): Promise<InterestGraphResponse> => {
    const response = await AXIOS.get<InterestGraphResponse>(endpoints.interest.getGraph)
    return response.data
  },

  createEdge: async (request: CreateInterestEdgeRequest): Promise<CreateInterestEdgeResponse> => {
    const response = await AXIOS.post<CreateInterestEdgeResponse>(
      endpoints.interest.createEdge,
      request
    )
    return response.data
  },

  deleteEdge: async (id: string): Promise<void> => {
    const response = await AXIOS.delete(endpoints.interest.deleteEdgeWithId(id))
    return response.data
  },

  createMajorInterest: async (
    request: CreateMajorInterestRequest,
    id: string
  ): Promise<CreateMajorInterestResponse> => {
    const response = await AXIOS.post<CreateMajorInterestResponse>(
      endpoints.interest.createMajorIntrestWithId(id),
      request
    )
    return response.data
  },

  deleteMajorInterest: async (id: string): Promise<void> => {
    const response = await AXIOS.delete(endpoints.interest.deleteMajorIntrestWithId(id))
    return response.data
  },

  getMajorInterest: async (): Promise<MajorInterestResponse> => {
    const response = await AXIOS.get<MajorInterestResponse>(endpoints.interest.getMajorInterest)
    return response.data
  },

  updateMajorInterestOrder: async (request: UpdateMajorInterestOrderRequest): Promise<void> => {
    const response = await AXIOS.put(endpoints.interest.updateMajorIntrestOrder, request)
    return response.data
  },

  getRecommend: async (): Promise<RecommendInterestResponse> => {
    const response = await AXIOS.get<RecommendInterestResponse>(endpoints.interest.getRocommend)
    return response.data
  },
}
