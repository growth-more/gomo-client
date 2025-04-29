import { Button, ButtonProps, Typography, TypographyProps } from '@mui/material'

interface PrimaryButtonProps extends ButtonProps {
  label: string
  fontProps?: TypographyProps
}

export function PrimaryButton({ label, fontProps, ...buttonProps }: PrimaryButtonProps) {
  return (
    <Button variant="contained" {...buttonProps}>
      <Typography fontSize={15} fontWeight={700} noWrap {...fontProps}>
        {label}
      </Typography>
    </Button>
  )
}
