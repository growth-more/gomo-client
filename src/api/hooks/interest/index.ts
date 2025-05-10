import { useGetInterest } from './use-get-interest'
import { useGetInterestGraph } from './use-get-interest-graph'
import { useCreateInterest } from './use-create-interest'
import { useCreateInterestEdge } from './use-create-interest-edge'
import { useDeleteInterest } from './use-delete-interest'
import { useDeleteInterestEdge } from './use-delete-interest-edge'
import { useUpdateInterest } from './use-update-interest'
import { useUpdateInterestLogo } from './use-update-interest-logo'

export * from './use-create-interest'
export * from './use-create-interest-edge'
export * from './use-delete-interest'
export * from './use-delete-interest-edge'
export * from './use-get-interest'
export * from './use-get-interest-graph'
export * from './use-update-interest'
export * from './use-update-interest-logo'

export function useInterest() {
  const { interests, isLoading } = useGetInterest()
  const { createInterest } = useCreateInterest()
  const { updateInterest } = useUpdateInterest()
  const { updateInterestLogo } = useUpdateInterestLogo()
  const { deleteInterest } = useDeleteInterest()

  const { interestGraph, isLoading: isInterestGraphLoading } = useGetInterestGraph()
  const { createEdge } = useCreateInterestEdge()
  const { deleteEdge } = useDeleteInterestEdge()

  return {
    interests,
    isLoading,
    interestGraph,
    isInterestGraphLoading,
    createInterest,
    updateInterest,
    updateInterestLogo,
    deleteInterest,
    createEdge,
    deleteEdge,
  }
}

import { useGetMajorInterest } from './use-get-major-interest'
import { useCreateMajorInterest } from './use-create-major-interest'
import { useDeleteMajorInterest } from './use-delete-major-interest'

export * from './use-get-major-interest'
export * from './use-create-major-interest'
export * from './use-delete-major-interest'

export function useMajorInterest() {
  const { majorInterest, isLoading } = useGetMajorInterest()
  const { createMajorInterest } = useCreateMajorInterest()
  const { deleteMajorInterest } = useDeleteMajorInterest()

  return {
    majorInterest,
    isLoading,
    createMajorInterest,
    deleteMajorInterest,
  }
}
