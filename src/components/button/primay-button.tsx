import { Button, ButtonProps, Typography } from '@mui/material'

interface PrimaryButtonProps extends ButtonProps {
  label: string
}

export function PrimaryButton({ label, ...buttonProps }: PrimaryButtonProps) {
  return (
    <Button variant="contained" {...buttonProps}>
      <Typography fontSize={15} fontWeight={700} noWrap>
        {label}
      </Typography>
    </Button>
  )
}
