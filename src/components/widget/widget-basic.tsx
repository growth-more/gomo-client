import { IconButtons } from '@/components/icon-button'
import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import { colord } from 'colord'
import { ReactNode } from 'react'

interface WidgetBasicProps {
  title?: string
  subtitle?: string
  children?: ReactNode
  width?: number
  height?: number
  onAdd?: () => void
  onTitle?: () => void
  sx?: SxProps<Theme>
  disableTitle?: boolean
}

export function WidgetBasic({
  title,
  subtitle,
  children,
  width = 1,
  height = 1,
  onAdd,
  onTitle,
  sx,
  disableTitle = false,
}: WidgetBasicProps) {
  return (
    <Stack
      border={1}
      borderRadius={2}
      borderColor={(theme) => theme.palette.border.main}
      width={calculateWidgetWidth(width)}
      height={calculateWidgetHeight(height)}
      overflow="hidden"
      boxShadow={(theme) =>
        `0px 5px 20px 0px ${colord(theme.palette.common.black).alpha(0.1).toHex()}`
      }
    >
      {!disableTitle && (
        <WidgetTitle title={title} subtitle={subtitle} onAdd={onAdd} onTitle={onTitle} />
      )}
      <Box flex={1} width={1} bgcolor={(theme) => theme.palette.background.default} sx={sx}>
        {children}
      </Box>
    </Stack>
  )
}

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
        alignItems="flex-start"
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
