import { IconButton, Typography } from '@mui/material'

interface MainViewSidebarItemProps {
  label: string
  icon?: string
  onClick?: () => void
  selected?: boolean
}

export function MainViewSidebarItem({ label, onClick, selected }: MainViewSidebarItemProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: selected ? 'primary.main' : undefined,
        '&:hover': {
          bgcolor: selected ? 'primary.main' : undefined,
        },
      }}
    >
      <Typography
        fontSize={13}
        fontWeight={400}
        textAlign="left"
        width={1}
        sx={{
          color: (theme) => (selected ? theme.palette.common.white : theme.palette.text.primary),
        }}
      >
        {label}
      </Typography>
    </IconButton>
  )
}
