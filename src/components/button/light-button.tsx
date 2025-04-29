import { Button, ButtonProps, SxProps, Theme, Typography } from '@mui/material'

interface LightButtonProps extends ButtonProps {
  label: string
  onClick?: () => void
  sx?: SxProps<Theme>
}

export function LightButton({ label, onClick, sx, ...buttonProps }: LightButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.text.secondary,
        backgroundColor: (theme) => theme.palette.grey[100],
        '&:hover': {
          backgroundColor: (theme) => theme.palette.grey[200],
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
