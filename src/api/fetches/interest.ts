import { AXIOS, endpoints, axiosStatus } from '@/api'
import { ApiError, apiErrorCode, errorCode } from '@/api/error'
import {
  CreateInterestEdgeFetchRequest,
  CreateInterestEdgeResponse,
  CreateInterestFetchRequest,
  CreateInterestResponse,
  CreateMajorInterestFetchRequest,
  CreateMajorInterestResponse,
  DeleteInterestEdgeFetchRequest,
  DeleteInterestFetchRequest,
  DeleteMajorInterestFetchRequest,
  GetInterestFetchRequest,
  InterestGraphResponse,
  InterestListResponse,
  InterestResponse,
  MajorInterestResponse,
  RecommendInterestResponse,
  UpdateInterestFetchRequest,
  UpdateInterestLogoFetchRequest,
  UpdateMajorInterestOrderFetchRequest,
} from '@/api/types'

export const interest = {
  create: async (params: CreateInterestFetchRequest): Promise<CreateInterestResponse> => {
    return axiosStatus(
      () => {
        const formData = new FormData()
        formData.append('logo', params.body.logo)
        formData.append('request', JSON.stringify(params.body.request.name))
        return AXIOS.post<CreateInterestResponse>(endpoints.interest.create, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      },
      {
        onSuccess: (data) => data,
        onCode: {
          [apiErrorCode.INVALID_PARAMETER]: () =>
            new ApiError(errorCode.interest.create.INVALID_PARAMETER),
          [apiErrorCode.IMAGE_TOO_LARGE]: () =>
            new ApiError(errorCode.interest.create.IMAGE_TOO_LARGE),
        },
      }
    )
  },

  get: async (params: GetInterestFetchRequest): Promise<InterestResponse> => {
    return axiosStatus(() => AXIOS.get<InterestResponse>(endpoints.interest.getWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  getList: async (): Promise<InterestListResponse> => {
    return axiosStatus(() => AXIOS.get<InterestListResponse>(endpoints.interest.getList), {
      onSuccess: (data) => data,
    })
  },

  update: async (params: UpdateInterestFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.interest.updateWithId(params.id), params.body), {
      onSuccess: (data) => data,
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: () =>
          new ApiError(errorCode.interest.update.INVALID_PARAMETER),
      },
    })
  },

  delete: async (params: DeleteInterestFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.interest.deleteWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  updateLogo: async (params: UpdateInterestLogoFetchRequest): Promise<void> => {
    return axiosStatus(
      () =>
        AXIOS.put(endpoints.interest.updateLogoWithId(params.id), params.body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: (data) => data,
        onCode: {
          [apiErrorCode.IMAGE_TOO_LARGE]: () =>
            new ApiError(errorCode.interest.update.IMAGE_TOO_LARGE),
        },
      }
    )
  },

  getGraph: async (): Promise<InterestGraphResponse> => {
    return axiosStatus(() => AXIOS.get<InterestGraphResponse>(endpoints.interest.getGraph), {
      onSuccess: (data) => data,
    })
  },

  createEdge: async (
    params: CreateInterestEdgeFetchRequest
  ): Promise<CreateInterestEdgeResponse> => {
    return axiosStatus(
      () => AXIOS.post<CreateInterestEdgeResponse>(endpoints.interest.createEdge, params.body),
      {
        onSuccess: (data) => data,
      }
    )
  },

  deleteEdge: async (params: DeleteInterestEdgeFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.delete(endpoints.interest.deleteEdgeWithId(params.id)), {
      onSuccess: (data) => data,
    })
  },

  createMajorInterest: async (
    params: CreateMajorInterestFetchRequest
  ): Promise<CreateMajorInterestResponse> => {
    return axiosStatus(
      () =>
        AXIOS.post<CreateMajorInterestResponse>(
          endpoints.interest.createMajorInterestWithId(params.id)
        ),
      {
        onSuccess: (data) => data,
        onCode: {
          [apiErrorCode.DUPLICATED]: () => new ApiError(errorCode.interest.major.DUPLICATED),
        },
      }
    )
  },

  deleteMajorInterest: async (params: DeleteMajorInterestFetchRequest): Promise<void> => {
    return axiosStatus(
      () => AXIOS.delete(endpoints.interest.deleteMajorInterestWithId(params.id)),
      {
        onSuccess: (data) => data,
      }
    )
  },

  getMajorInterest: async (): Promise<MajorInterestResponse> => {
    return axiosStatus(
      () => AXIOS.get<MajorInterestResponse>(endpoints.interest.getMajorInterest),
      {
        onSuccess: (data) => data,
      }
    )
  },

  updateMajorInterestOrder: async (params: UpdateMajorInterestOrderFetchRequest): Promise<void> => {
    return axiosStatus(() => AXIOS.put(endpoints.interest.updateMajorInterestOrder, params.body), {
      onSuccess: (data) => data,
    })
  },

  getRecommend: async (): Promise<RecommendInterestResponse> => {
    return axiosStatus(
      () => AXIOS.get<RecommendInterestResponse>(endpoints.interest.getRecommended),
      {
        onSuccess: (data) => data,
      }
    )
  },
}
