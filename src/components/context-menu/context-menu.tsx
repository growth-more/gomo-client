import { CONTEXT_MENU_PADDING, CONTEXT_MENU_WIDTH } from '@/components/context-menu/constatns'
import { ContextMenuItem } from '@/components/context-menu/context-menu-item'
import { IContextMenuItem } from '@/stores/use-context-menu-store'
import { Box, Stack } from '@mui/material'
import { colord } from 'colord'

interface ContextMenuProps {
  items: IContextMenuItem[][]
  x: number
  y: number
}

export function ContextMenu({ items, x, y }: ContextMenuProps) {
  return (
    <Stack
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      boxShadow={(theme) =>
        `0px 5px 20px 0px ${colord(theme.palette.common.black).alpha(0.1).toHex()}`
      }
      p={`${CONTEXT_MENU_PADDING}px`}
      spacing={`${CONTEXT_MENU_PADDING}px`}
      width={CONTEXT_MENU_WIDTH}
      sx={{ zIndex: 100000, position: 'fixed', left: x, top: y, userSelect: 'none' }}
      divider={<Box borderBottom={1} borderColor={(theme) => theme.palette.border.main} />}
    >
      {items.map((group, i) => (
        <Stack key={i}>
          {group.map((item, i) => (
            <ContextMenuItem
              key={i}
              label={item.label}
              icon={item.icon}
              type={item.type}
              onClick={item.onClick}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  )
}
