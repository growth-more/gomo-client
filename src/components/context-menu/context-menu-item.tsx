import { CONTEXT_MENU_ITEM_HEIGHT } from '@/components/context-menu/constatns'
import { Iconify } from '@/components/iconify'
import { ContextMenuType } from '@/stores/use-context-menu-store'
import { IconButton, Stack, Typography } from '@mui/material'

interface ContextMenuItemProps {
  label: string
  icon?: string
  type?: ContextMenuType
  onClick?: () => void
}

export function ContextMenuItem({ label, icon, type, onClick }: ContextMenuItemProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ p: 1, borderRadius: 1, height: CONTEXT_MENU_ITEM_HEIGHT }}
      color={type === 'danger' ? 'error' : 'default'}
    >
      <Stack direction="row" spacing={1} width={1}>
        {icon && <Iconify icon={icon} width={15} />}
        <Typography fontSize={12} fontWeight={500}>
          {label}
        </Typography>
      </Stack>
    </IconButton>
  )
}
