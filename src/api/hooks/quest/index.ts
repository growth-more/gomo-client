import { useCreateAssignQuest } from './use-create-assign-quest'
import { useCompleteAssignQuest } from './use-complete-assign-quest'
import { useConfirmAssignQuest } from './use-confirm-assign-quest'
import { useDeleteAssignQuest } from './use-delete-assign-quest'
import { useGetAssignQuest } from './use-get-assign-quest'
import { useUpdateAssignQuest } from './use-update-assign-quest'

export * from './use-create-assign-quest'
export * from './use-complete-assign-quest'
export * from './use-confirm-assign-quest'
export * from './use-delete-assign-quest'
export * from './use-get-assign-quest'
export * from './use-update-assign-quest'

export function useAssignQuest() {
  const { daily, weekly, monthly, isLoading } = useGetAssignQuest()
  const { createAssignQuest } = useCreateAssignQuest()
  const { completeAssignQuest } = useCompleteAssignQuest()
  const { confirmAssignQuest } = useConfirmAssignQuest()
  const { deleteAssignQuest } = useDeleteAssignQuest()
  const { updateAssignQuest } = useUpdateAssignQuest()

  return {
    daily,
    weekly,
    monthly,
    isLoading,
    createQuest: createAssignQuest,
    completeQuest: completeAssignQuest,
    confirmQuest: confirmAssignQuest,
    deleteQuest: deleteAssignQuest,
    updateQuest: updateAssignQuest,
  }
}

import { useGetRepeatQuest } from './use-get-repeat-quest'
import { useCreateRepeatQuest } from './use-create-repeat-quest'
import { useUpdateRepeatQuest } from './use-update-repeat-quest'
import { useDeleteRepeatQuest } from './use-delete-repeat-quest'

export * from './use-get-repeat-quest'
export * from './use-create-repeat-quest'
export * from './use-update-repeat-quest'
export * from './use-delete-repeat-quest'

export function useRepeatQuest() {
  const { repeatQuest, isLoading } = useGetRepeatQuest()
  const { createRepeatQuest } = useCreateRepeatQuest()
  const { updateRepeatQuest } = useUpdateRepeatQuest()
  const { deleteRepeatQuest } = useDeleteRepeatQuest()

  return {
    repeatQuest,
    isLoading,
    createQuest: createRepeatQuest,
    updateQuest: updateRepeatQuest,
    deleteQuest: deleteRepeatQuest,
  }
}

import { useGetQuestProperty } from './use-get-quest-property'
import { useUpdateQuestProperty } from './use-update-quest-property'

export * from './use-get-quest-property'
export * from './use-update-quest-property'

export function useQuestSetting() {
  const { questProperty, isLoading } = useGetQuestProperty()
  const { updateQuestProperty } = useUpdateQuestProperty()

  return {
    questProperty,
    isLoading,
    updateQuestProperty,
  }
}
