import { create } from 'zustand'

export type ContextMenuType = 'normal' | 'danger'

export interface IContextMenuItem {
  label: string
  icon?: string
  type?: ContextMenuType
  onClick?: () => void
}

export interface IContextMenu {
  items: IContextMenuItem[][]
  x: number
  y: number
}

interface ContextMenuState {
  contextMenu: IContextMenu | null
  openContextMenu: (context: IContextMenu) => void
  closeContextMenu: () => void
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  contextMenu: null,
  openContextMenu: (context) => set({ contextMenu: context }),
  closeContextMenu: () => set({ contextMenu: null }),
}))
