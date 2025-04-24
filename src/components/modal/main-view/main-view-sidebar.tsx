import { IconButton } from '@/components/icon-button'
import { MainViewSidebarItem } from '@/components/modal/main-view/main-view-sidebar-item'
import { Box, Stack, Typography } from '@mui/material'

export const MAIN_VIEW_SIDEBAR_WIDTH = 200

export interface MainViewSidebarMenuGroup {
  title?: string
  menu: MainViewSidebarMenu[]
}

export interface MainViewSidebarMenu {
  id: string
  label: string
  icon?: string
  onClick?: () => void
}

interface MainViewSidebarProps {
  menu: MainViewSidebarMenuGroup[]
  selectedMenuId?: string | null
  onSelected?: (id: string) => void
}

export function MainViewSidebar({ menu, selectedMenuId, onSelected }: MainViewSidebarProps) {
  const menuClickHandler = (id: string, onClick?: () => void) => {
    if (onClick) {
      onClick()
      return
    }
    onSelected?.(id)
  }

  return (
    <Stack
      width={MAIN_VIEW_SIDEBAR_WIDTH}
      borderRight={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
    >
      <Stack p={0.5} borderBottom={1} borderColor={(theme) => theme.palette.border.main}>
        <IconButton.Sidebar />
      </Stack>
      <Stack
        p={1}
        divider={
          <Box width={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
        }
        spacing={1}
      >
        {menu.map((group, i) => (
          <Stack key={i} spacing={0.5}>
            {group.title && (
              <Typography fontSize={11} fontWeight={600} pb={1} px={0.5}>
                {group.title}
              </Typography>
            )}
            {group.menu.map((menu, j) => (
              <MainViewSidebarItem
                key={j}
                label={menu.label}
                icon={menu.icon}
                onClick={() => menuClickHandler(menu.id, menu.onClick)}
                selected={menu.id === selectedMenuId}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
