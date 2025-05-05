import { IconButtons } from '@/components/icon-button'
import { MainViewSidebarItem } from '@/components/modal/main-view/main-view-sidebar-item'
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import { Fragment, ReactNode } from 'react'

export const MAIN_VIEW_SIDEBAR_WIDTH = 200

export interface MainViewSidebarMenuGroup<T> {
  title?: string
  menu: MainViewSidebarMenu<T>[]
}

export interface MainViewSidebarMenu<T> {
  id: T
  label: string
  icon?: string
  onClick?: () => void
}

interface MainViewSidebarProps<T> {
  menu: MainViewSidebarMenuGroup<T>[]
  selectedMenuId?: T | null
  onSelected?: (id: T) => void
  actions?: ReactNode[]
  actionSx?: SxProps<Theme>
}

export function MainViewSidebar<T>({
  menu,
  selectedMenuId,
  onSelected,
  actions,
  actionSx,
}: MainViewSidebarProps<T>) {
  const menuClickHandler = (id: T, onClick?: () => void) => {
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
      flexShrink={0}
    >
      <Stack p={0.5} borderBottom={1} borderColor={(theme) => theme.palette.border.main}>
        <IconButtons.Sidebar />
      </Stack>

      <Stack
        p={1}
        divider={
          <Box width={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
        }
        flex={1}
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

      {actions && (
        <Stack
          p={1}
          borderTop={1}
          borderColor={(theme) => theme.palette.border.main}
          spacing={1}
          sx={actionSx}
        >
          {actions.map((action, i) => (
            <Fragment key={i}>{action}</Fragment>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
