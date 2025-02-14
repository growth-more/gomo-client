import { Box, Button, Stack, Typography } from '@mui/material'

interface WindowHeaderProps {
  title?: string
  closable?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onClose?: () => void
}

export function WindowHeader({ title, closable, onEnter, onLeave, onClose }: WindowHeaderProps) {
  return (
    <Box width={1} px={2} py={1} bgcolor="divider" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography
          variant="caption"
          flex={1}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {title}
        </Typography>
        {closable && (
          <Button
            size="small"
            sx={{
              p: 0,
              minWidth: 12,
              minHeight: 12,
              bgcolor: 'error.main',
              borderRadius: 100,
              flexShrink: 0,
            }}
            onMouseEnter={onLeave}
            onMouseLeave={onEnter}
            onClick={onClose}
          />
        )}
      </Stack>
    </Box>
  )
}
