import { IconButton, Stack, Typography } from '@mui/material'

interface SelectInterestItemProps {
  name: string
  selected?: boolean
  onClick?: () => void
  disable?: boolean
}

export function SelectInterestItem({ name, selected, onClick, disable }: SelectInterestItemProps) {
  return (
    <IconButton onClick={onClick} sx={{ borderRadius: 1, p: 0 }} disabled={disable}>
      <Stack
        p={1}
        width={1}
        borderRadius={1}
        alignItems="flex-start"
        bgcolor={(theme) => (selected ? theme.palette.primary.main : 'transparent')}
      >
        <Typography
          fontWeight={selected ? 600 : 400}
          sx={{
            color: (theme) =>
              selected
                ? theme.palette.primary.contrastText
                : disable
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
          }}
          noWrap
        >
          {name}
        </Typography>
      </Stack>
    </IconButton>
  )
}
