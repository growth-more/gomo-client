import type { Props } from 'simplebar-react'
import type { Theme, SxProps } from '@mui/material'

export interface ScrollbarProps extends Props {
  sx?: SxProps<Theme>
  children?: React.ReactNode
  fillContent?: boolean
  naturalScroll?: boolean
  slotProps?: {
    wrapper?: SxProps<Theme>
    contentWrapper?: SxProps<Theme>
    content?: Partial<SxProps<Theme>>
  }
}
