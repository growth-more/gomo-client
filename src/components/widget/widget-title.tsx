import { IconButtons } from '@/components/icon-button'
import { Stack, Typography } from '@mui/material'

interface WidgetTitleProps {
  title?: string
  subtitle?: string
  onTitle?: () => void
  onAdd?: () => void
}

export function WidgetTitle({ title, subtitle, onTitle, onAdd }: WidgetTitleProps) {
  return (
    <Stack
      p={1}
      width={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={(theme) => theme.palette.background.main}
      borderBottom={1}
      borderColor={(theme) => theme.palette.border.main}
      spacing={1}
    >
      {/* title area */}
      <Stack
        p={1}
        flex={1}
        borderRadius={1.5}
        sx={{
          ':hover': {
            cursor: 'pointer',
            bgcolor: (theme) => theme.palette.background.dark,
          },
          userSelect: 'none',
        }}
        onClick={onTitle}
      >
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>

      {/* button area */}
      <Stack direction="row">{onAdd && <IconButtons.Add onClick={onAdd} />}</Stack>
    </Stack>
  )
}
