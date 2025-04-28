import {
  CONTEXT_MENU_ITEM_HEIGHT,
  CONTEXT_MENU_PADDING,
  CONTEXT_MENU_WIDTH,
} from '@/components/context-menu/constatns'
import { IContextMenuItem, useContextMenuStore } from '@/stores/use-context-menu-store'
import { MouseEvent } from 'react'

export function useContextMenu(contextMenu: IContextMenuItem[][]) {
  const { openContextMenu } = useContextMenuStore()

  const caculatePosition = (x: number, y: number) => {
    const width = window.innerWidth

    if (x + CONTEXT_MENU_WIDTH > width) {
      x -= CONTEXT_MENU_WIDTH
    }

    const height = window.innerHeight
    const contextMenuHeight = contextMenu.reduce((acc, group) => {
      return acc + group.length * CONTEXT_MENU_ITEM_HEIGHT + CONTEXT_MENU_PADDING * 2
    }, 0)

    if (y + contextMenuHeight > height) {
      y -= contextMenuHeight
    }

    return { x, y }
  }

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openContextMenu({ ...caculatePosition(e.clientX, e.clientY), items: contextMenu })
  }

  return onContextMenu
}
