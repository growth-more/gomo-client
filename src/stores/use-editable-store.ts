import { uniqueId } from 'lodash'
import { create } from 'zustand'

interface EditableStore {
  editableId: string | null
  assign: () => string
  release: () => void
}

export const useEditableStore = create<EditableStore>()((set) => ({
  editableId: null,
  assign: () => {
    const editableId = uniqueId()
    set({ editableId })
    return editableId
  },
  release: () => set({ editableId: null }),
}))
