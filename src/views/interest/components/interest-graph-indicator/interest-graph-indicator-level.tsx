import { Stack, Typography } from '@mui/material'

interface InterestGraphIndicatorLevelProps {
  level: number
}

export function InterestGraphIndicatorLevel({ level }: InterestGraphIndicatorLevelProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      spacing={0.5}
      px={1}
      py={0.5}
    >
      <Typography fontWeight={400} fontSize={12} color="textSecondary">
        LV
      </Typography>
      <Typography fontWeight={400} fontSize={12} color="textSecondary">
        {level}
      </Typography>
    </Stack>
  )
}
