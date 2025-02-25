import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

import { WindowViewProps, WindowViewState } from '@/components/window'

interface WindowState {
  views: WindowViewState[]
  addView: (props: Omit<WindowViewProps, 'id'>) => void
  addViewWithId: (id: string, props: Omit<WindowViewProps, 'id'>) => void
  toggleViewWithId: (id: string, props: Omit<WindowViewProps, 'id'>) => void
  removeView: (id: string) => void
  removeTop: () => void
  shiftToTop: (id: string) => void
}

function createState(id: string, props: Omit<WindowViewProps, 'id'>): WindowViewState {
  return {
    id,
    props: { ...props, id },
    // position: props.defaultPosition ?? DEFAULT_VIEW_POSITION,
    // size: props.defaultSize ?? DEFAULT_VIEW_SIZE,
  }
}

export const useWindowStore = create<WindowState>((set) => ({
  views: [],

  addView: (props) =>
    set((state) => ({
      views: [...state.views, createState(uuidv4(), props)],
    })),

  addViewWithId: (id, props) =>
    set((state) => {
      const view = state.views.find((v) => v.id === id)
      if (view) {
        return { views: [...state.views.filter((v) => v.id !== id), view] }
      }
      return {
        views: [...state.views, createState(id, props)],
      }
    }),

  toggleViewWithId: (id, props) =>
    set((state) => {
      if (state.views.some((v) => v.id === id)) {
        return { views: state.views.filter((v) => v.id !== id) }
      }
      return { views: [...state.views, createState(id, props)] }
    }),

  removeView: (id) => set((state) => ({ views: state.views.filter((v) => v.id !== id) })),

  removeTop: () =>
    set((state) => {
      if (state.views.length === 0) {
        return state
      }
      return { views: state.views.slice(0, -1) }
    }),

  shiftToTop: (id) =>
    set((state) => {
      if (state.views.length > 0 && state.views[state.views.length - 1].id === id) {
        return state
      }
      const view = state.views.find((v) => v.id === id)
      if (!view) {
        return state
      }
      return {
        views: [...state.views.filter((v) => v.id !== id), view],
      }
    }),
}))
