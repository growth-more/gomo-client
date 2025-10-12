import { Theme } from '@emotion/react'
import { IconButton, IconButtonProps, SxProps, Typography, TypographyProps } from '@mui/material'

interface SelectedButtonProps extends IconButtonProps {
  label: string
  selected?: boolean
  onClick?: () => void
  sx?: SxProps<Theme>
  typoProps?: TypographyProps
}

export function SelectedButton({
  label,
  onClick,
  sx,
  selected,
  typoProps,
  ...iconButtonProps
}: SelectedButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: selected ? 'primary.main' : undefined,
        '&:hover': {
          bgcolor: selected ? 'primary.main' : undefined,
        },
        ...sx,
      }}
      {...iconButtonProps}
    >
      <Typography
        fontSize={13}
        fontWeight={400}
        textAlign="left"
        width={1}
        sx={{
          color: (theme) => (selected ? theme.palette.common.white : theme.palette.text.primary),
        }}
        {...typoProps}
      >
        {label}
      </Typography>
    </IconButton>
  )
}
