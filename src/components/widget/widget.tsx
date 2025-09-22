import { calculateWidgetHeight, calculateWidgetWidth } from '@/components/widget/utils'
import { WidgetTitle } from '@/components/widget/widget-title'
import { Box, Stack, SxProps, Theme } from '@mui/material'
import { colord } from 'colord'
import { ReactNode } from 'react'

interface WidgetProps {
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

export function Widget({
  title,
  subtitle,
  children,
  width = 1,
  height = 1,
  onAdd,
  onTitle,
  sx,
  disableTitle = false,
}: WidgetProps) {
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
