import { IconButton } from '@/components/icon-button'
import { Stack, Typography } from '@mui/material'

interface MainViewTitleProps {
  title: string
  subtitle?: string
  onClose?: () => void
}

export function MainViewTitle({ title, subtitle, onClose }: MainViewTitleProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      p={2}
      bgcolor={(theme) => theme.palette.background.main}
      borderBottom={1}
      borderColor={(theme) => theme.palette.border.main}
    >
      <Stack justifyContent="center">
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
      <IconButton.Close onClick={onClose} />
    </Stack>
  )
}
