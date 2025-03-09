import { Box, Typography } from '@mui/material'

interface InterestLevelLabelProps {
  level: number
}

export function InterestLevelLabel({ level }: InterestLevelLabelProps) {
  return (
    <Box
      flexShrink={0}
      px={1}
      py={0.5}
      bgcolor={(theme) => theme.palette.grey[800]}
      borderRadius={1}
    >
      <Typography fontSize={12} fontWeight={400} noWrap>
        LV {level}
      </Typography>
    </Box>
  )
}
