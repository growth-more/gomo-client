import 'simplebar-react/dist/simplebar.min.css'

import { forwardRef } from 'react'
import { Box } from '@mui/material'
import SimpleBar from 'simplebar-react'

import type { ScrollbarProps } from './types'

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ children, sx, ...other }, ref) => (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
)
