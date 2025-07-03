import {
  MAIN_VIEW_SIDEBAR_WIDTH,
  MainViewSidebar,
  MainViewSidebarMenuGroup,
} from '@/components/modal/main-view/main-view-sidebar'
import { MainViewTitle } from '@/components/modal/main-view/main-view-title'
import { useBoolean } from '@/hooks'
import { useModalStore } from '@/stores/use-modal-store'
import { Box, Dialog, SxProps, Stack, Theme, useMediaQuery } from '@mui/material'
import { motion } from 'motion/react'
import { ReactNode, useEffect } from 'react'

interface MainViewProps<T> {
  modalId: string
  title: string
  subtitle?: string
  sidebar: MainViewSidebarMenuGroup<T>[]
  selectedMenuId?: T | null
  onSelected?: (id: T) => void
  children?: ReactNode
  width?: number
  height?: number
  actions?: ReactNode[]
  actionSx?: SxProps<Theme>
}

export function MainView<T>({
  title,
  subtitle,
  modalId,
  sidebar,
  selectedMenuId,
  onSelected,
  children,
  width = 1000,
  height = 700,
  actions,
  actionSx,
}: MainViewProps<T>) {
  const { removeModal } = useModalStore()

  const isCollapsed = useBoolean()
  const isPeeking = useBoolean(false)

  const isAutoCollapse = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    if (isAutoCollapse) {
      isCollapsed.onTrue()
      return
    }
    isCollapsed.onFalse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoCollapse])

  useEffect(() => {
    if (isCollapsed.value) {
      isPeeking.onFalse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed.value])

  useEffect(() => {}, [isPeeking.value])

  return (
    <Dialog
      open
      sx={{ py: 4 }}
      PaperProps={{
        sx: {
          width: 1,
          height: 1,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          border: 1,
          borderRadius: 2,
          borderColor: (theme) => theme.palette.border.main,
        },
      }}
    >
      {isCollapsed.value && !isPeeking.value && (
        <Box
          position="absolute"
          width="50px"
          height={1}
          onMouseEnter={isPeeking.onTrue}
          zIndex={11}
        />
      )}
      <Stack width={1} height={1}>
        <MainViewTitle title={title} subtitle={subtitle} onClose={() => removeModal(modalId)} />
        <Stack direction="row" width={1} height={1} overflow="hidden" position="relative">
          <MainViewSidebar
            menu={sidebar}
            selectedMenuId={selectedMenuId}
            onSelected={onSelected}
            actions={actions}
            actionSx={actionSx}
            collapsed={isCollapsed.value}
            onCollapse={isCollapsed.toggle}
            isPeeking={isPeeking.value}
            onPeekingOut={isPeeking.onFalse}
          />
          <Box
            flex={1}
            component={motion.div}
            initial={{ marginLeft: isCollapsed.value ? 0 : MAIN_VIEW_SIDEBAR_WIDTH }}
            animate={{ marginLeft: isCollapsed.value ? 0 : MAIN_VIEW_SIDEBAR_WIDTH }}
            transition={{ duration: 0.2 }}
            sx={{ overflowY: 'auto', overflowX: 'hidden' }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
