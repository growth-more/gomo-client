import { Box, IconButton } from '@mui/material'

interface SelectInterestColorCellProps {
  color: string
  selected?: boolean
  onClick?: () => void
}

export function SelectInterestColorCell({
  color,
  selected,
  onClick,
}: SelectInterestColorCellProps) {
  return (
    <IconButton sx={{ p: 0, borderRadius: 1 }} onClick={onClick}>
      <Box p="3px" border={2} borderColor={selected ? color : 'transparent'} borderRadius={1}>
        <Box width={20} height={20} borderRadius={1} bgcolor={color} />
      </Box>
    </IconButton>
  )
}
