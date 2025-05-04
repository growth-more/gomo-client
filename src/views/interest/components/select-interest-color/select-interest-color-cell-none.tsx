import { Box, IconButton } from '@mui/material'

interface SelectInterestColorCellNoneProps {
  selected?: boolean
  onClick?: () => void
}

export function SelectInterestColorCellNone({
  selected,
  onClick,
}: SelectInterestColorCellNoneProps) {
  return (
    <IconButton sx={{ p: 0, borderRadius: 1 }} onClick={onClick}>
      <Box
        p="3px"
        border={2}
        borderColor={(theme) => (selected ? theme.palette.border.dark : 'transparent')}
        borderRadius={1}
      >
        <Box
          width={20}
          height={20}
          borderRadius={1}
          border={1}
          borderColor={(theme) => theme.palette.border.main}
          bgcolor={(theme) => theme.palette.common.white}
          position="relative"
          sx={{
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '140%',
              height: '2px',
              backgroundColor: '#FB2C36',
              bottom: '45%',
              left: '-20%',
              transform: 'rotate(-45deg)',
              transformOrigin: 'center',
            },
          }}
        />
      </Box>
    </IconButton>
  )
}
