import { endpoints, axiosFetch } from '@/api'
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
    const formData = new FormData()
    formData.append('name', params.body.name)
    formData.append('colorCode', params.body.colorCode)

    if (params.body.logo) {
      formData.append('logo', params.body.logo)
    }

    return axiosFetch.postForm(endpoints.interest.create, formData, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.interest.create.INVALID_PARAMETER,
        [apiErrorCode.IMAGE_TOO_LARGE]: errorCode.interest.create.IMAGE_TOO_LARGE,
      },
    })
  },

  get: async (params: GetInterestFetchRequest): Promise<InterestResponse> => {
    return axiosFetch.get(endpoints.interest.getWithId(params.id))
  },

  getList: async (): Promise<InterestListResponse> => {
    return axiosFetch.get(endpoints.interest.getList)
  },

  update: async (params: UpdateInterestFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.interest.updateWithId(params.id), params.body, {
      onCode: {
        [apiErrorCode.INVALID_PARAMETER]: errorCode.interest.update.INVALID_PARAMETER,
      },
    })
  },

  delete: async (params: DeleteInterestFetchRequest): Promise<void> => {
    return axiosFetch.delete(endpoints.interest.deleteWithId(params.id))
  },

  updateLogo: async (params: UpdateInterestLogoFetchRequest): Promise<void> => {
    return axiosFetch.putForm(endpoints.interest.updateLogoWithId(params.id), params.body, {
      onCode: {
        [apiErrorCode.IMAGE_TOO_LARGE]: errorCode.interest.update.IMAGE_TOO_LARGE,
      },
    })
  },

  getGraph: async (): Promise<InterestGraphResponse> => {
    return axiosFetch.get(endpoints.interest.getGraph)
  },

  createEdge: async (
    params: CreateInterestEdgeFetchRequest
  ): Promise<CreateInterestEdgeResponse> => {
    return axiosFetch.post(endpoints.interest.createEdge, params.body)
  },

  deleteEdge: async (params: DeleteInterestEdgeFetchRequest): Promise<void> => {
    return axiosFetch.delete(endpoints.interest.deleteEdgeWithId(params.id))
  },

  createMajorInterest: async (
    params: CreateMajorInterestFetchRequest
  ): Promise<CreateMajorInterestResponse> => {
    return axiosFetch.post(endpoints.interest.createMajorInterestWithId(params.id), {
      onCode: {
        [apiErrorCode.DUPLICATED]: () => new ApiError(errorCode.interest.major.DUPLICATED),
      },
    })
  },

  deleteMajorInterest: async (params: DeleteMajorInterestFetchRequest): Promise<void> => {
    return axiosFetch.delete(endpoints.interest.deleteMajorInterestWithId(params.id))
  },

  getMajorInterest: async (): Promise<MajorInterestResponse> => {
    return axiosFetch.get(endpoints.interest.getMajorInterest)
  },

  updateMajorInterestOrder: async (params: UpdateMajorInterestOrderFetchRequest): Promise<void> => {
    return axiosFetch.put(endpoints.interest.updateMajorInterestOrder, params.body)
  },

  getRecommend: async (): Promise<RecommendInterestResponse> => {
    return axiosFetch.get(endpoints.interest.getRecommended)
  },
}
