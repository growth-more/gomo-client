import { Button, ButtonProps, SxProps, Theme, Typography } from '@mui/material'
import { MouseEvent } from 'react'

interface PlainButtonProps extends ButtonProps {
  label: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  sx?: SxProps<Theme>
}

export function PlainButton({ label, onClick, sx, ...buttonProps }: PlainButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.text.secondary,
        backgroundColor: (theme) => theme.palette.grey[200],
        '&:hover': {
          backgroundColor: (theme) => theme.palette.grey[300],
        },
        ...sx,
      }}
      {...buttonProps}
    >
      <Typography fontSize={13} fontWeight={700} noWrap>
        {label}
      </Typography>
    </Button>
  )
}
