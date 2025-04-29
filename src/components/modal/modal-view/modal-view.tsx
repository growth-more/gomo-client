import { Dialog } from '@mui/material'
import { ReactNode } from 'react'

interface ModalViewProps {
  width?: number
  height?: number
  children?: ReactNode
}

export function ModalView({ width = 450, height = 600, children }: ModalViewProps) {
  return (
    <Dialog
      open
      sx={{ py: 4 }}
      PaperProps={{
        sx: {
          width: 1,
          height: 1,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          border: 1,
          borderRadius: 2,
          borderColor: (theme) => theme.palette.border.main,
        },
      }}
    >
      {children}
    </Dialog>
  )
}
