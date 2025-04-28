import { Button, ButtonProps, Typography } from '@mui/material'

interface PlainButtonProps extends ButtonProps {
  label: string
  onClick?: () => void
}

export function PlainButton({ label, onClick, ...buttonProps }: PlainButtonProps) {
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
      }}
      {...buttonProps}
    >
      <Typography fontSize={13} fontWeight={700} noWrap>
        {label}
      </Typography>
    </Button>
  )
}
