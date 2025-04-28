import {
  MainViewSidebar,
  MainViewSidebarMenuGroup,
} from '@/components/modal/main-view/main-view-sidebar'
import { MainViewTitle } from '@/components/modal/main-view/main-view-title'
import { useModalStore } from '@/stores/use-modal-store'
import { Box, Dialog, Stack } from '@mui/material'
import { ReactNode } from 'react'

interface MainViewProps<T> {
  modalId: string
  title: string
  subtitle?: string
  sidebar: MainViewSidebarMenuGroup<T>[]
  selectedMenuId?: T | null
  onSelected?: (id: T) => void
  children?: ReactNode
}

export function MainView<T>({
  title,
  subtitle,
  modalId,
  sidebar,
  selectedMenuId,
  onSelected,
  children,
}: MainViewProps<T>) {
  const { removeModal } = useModalStore()

  return (
    <Dialog
      open
      PaperProps={{
        sx: {
          width: 1,
          height: 1,
          maxWidth: '800px',
          maxHeight: '600px',
          border: 1,
          borderRadius: 2,
          borderColor: (theme) => theme.palette.border.main,
        },
      }}
    >
      <Stack width={1} height={1}>
        <MainViewTitle title={title} subtitle={subtitle} onClose={() => removeModal(modalId)} />
        <Stack direction="row" width={1} height={1} overflow="hidden">
          <MainViewSidebar menu={sidebar} selectedMenuId={selectedMenuId} onSelected={onSelected} />
          <Box flex={1} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {children}
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
