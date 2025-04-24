import { ContextMenu } from '@/components/context-menu/context-menu'
import { useContextMenuStore } from '@/stores/use-context-menu-store'
import { useEffect } from 'react'

export function ContextMenuManager() {
  const { contextMenu, closeContextMenu } = useContextMenuStore()

  useEffect(() => {
    if (contextMenu === null) {
      return
    }
  }, [contextMenu])

  useEffect(() => {
    window.addEventListener('click', closeContextMenu)
    window.addEventListener('contextmenu', closeContextMenu)
    return () => {
      window.removeEventListener('click', closeContextMenu)
      window.removeEventListener('contextmenu', closeContextMenu)
    }
  }, [closeContextMenu])

  return (
    <>
      {contextMenu && <ContextMenu items={contextMenu.items} x={contextMenu.x} y={contextMenu.y} />}
    </>
  )
}
