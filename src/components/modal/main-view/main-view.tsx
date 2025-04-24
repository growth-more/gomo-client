import {
  MainViewSidebar,
  MainViewSidebarMenuGroup,
} from '@/components/modal/main-view/main-view-sidebar'
import { MainViewTitle } from '@/components/modal/main-view/main-view-title'
import { useModalStore } from '@/stores/use-modal-store'
import { Dialog, Stack } from '@mui/material'

interface MainViewProps {
  modalId: string
  title: string
  subtitle?: string
  sidebar: MainViewSidebarMenuGroup[]
  selectedMenuId?: string | null
  onSelected?: (id: string) => void
}

export function MainView({
  title,
  subtitle,
  modalId,
  sidebar,
  selectedMenuId,
  onSelected,
}: MainViewProps) {
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
        <Stack direction="row" height={1}>
          <MainViewSidebar menu={sidebar} selectedMenuId={selectedMenuId} onSelected={onSelected} />
        </Stack>
      </Stack>
    </Dialog>
  )
}
