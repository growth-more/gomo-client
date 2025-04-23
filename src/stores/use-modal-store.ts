import { ReactNode } from 'react'
import { create } from 'zustand'

interface Modal {
  id: string
  component: ReactNode
}

interface ModalState {
  modals: Modal[]
  addModal: (id: string, component: ReactNode) => void
  removeModal: (id: string) => void
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  addModal: (id, component) => set((state) => ({ modals: [...state.modals, { id, component }] })),
  removeModal: (id) => set((state) => ({ modals: state.modals.filter((m) => m.id !== id) })),
}))
