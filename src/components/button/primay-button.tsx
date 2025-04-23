import { Button, ButtonProps } from '@mui/material'

interface PrimaryButtonProps extends ButtonProps {
  label: string
}

export function PrimaryButton({ label, ...buttonProps }: PrimaryButtonProps) {
  return (
    <Button variant="contained" {...buttonProps}>
      {label}
    </Button>
  )
}
