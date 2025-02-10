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
import { axiosStatus } from '@/api/utils'

export const interest = {
  create: async (request: CreateInterestRequest): Promise<CreateInterestResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateInterestResponse>(endpoints.interest.create, request),
      {
        onSuccess: (data) => data,
      }
    )
  },

  get: async (id: string): Promise<InterestResponse> => {
    return axiosStatus(() => AXIOS.get<InterestResponse>(endpoints.interest.getWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  list: async (): Promise<InterestListResponse> => {
    return axiosStatus(() => AXIOS.get<InterestListResponse>(endpoints.interest.get), {
      onSuccess: (data) => data,
    })
  },

  update: async (request: UpdateInterestRequest, id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.interest.updateWithId(id), request), {
      onSuccess: (data) => data,
    })
  },

  delete: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.interest.deleteWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  updateLogo: async (request: UpdateInterestLogoRequest, id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.interest.updateLogoWithId(id), request), {
      onSuccess: (data) => data,
    })
  },

  getGraph: async (): Promise<InterestGraphResponse> => {
    return axiosStatus(() => AXIOS.get<InterestGraphResponse>(endpoints.interest.getGraph), {
      onSuccess: (data) => data,
    })
  },

  createEdge: async (request: CreateInterestEdgeRequest): Promise<CreateInterestEdgeResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateInterestEdgeResponse>(endpoints.interest.createEdge, request),
      {
        onSuccess: (data) => data,
      }
    )
  },

  deleteEdge: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.interest.deleteEdgeWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  createMajorInterest: async (
    request: CreateMajorInterestRequest,
    id: string
  ): Promise<CreateMajorInterestResponse> => {
    return axiosStatus(
      () =>
        AXIOS.post<CreateMajorInterestResponse>(
          endpoints.interest.createMajorIntrestWithId(id),
          request
        ),
      {
        onSuccess: (data) => data,
      }
    )
  },

  deleteMajorInterest: async (id: string): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.interest.deleteMajorIntrestWithId(id)), {
      onSuccess: (data) => data,
    })
  },

  getMajorInterest: async (): Promise<MajorInterestResponse> => {
    return axiosStatus(
      () => AXIOS.get<MajorInterestResponse>(endpoints.interest.getMajorInterest),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updateMajorInterestOrder: async (request: UpdateMajorInterestOrderRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.interest.updateMajorIntrestOrder, request), {
      onSuccess: (data) => data,
    })
  },

  getRecommend: async (): Promise<RecommendInterestResponse> => {
    return axiosStatus(
      () => AXIOS.get<RecommendInterestResponse>(endpoints.interest.getRocommend),
      {
        onSuccess: (data) => data,
      }
    )
  },
}
