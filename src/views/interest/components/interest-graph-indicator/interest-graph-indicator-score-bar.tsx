import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'

interface InterestGraphIndicatorScoreBarProps {
  score: number
  scoreThreshold: number
}

export function InterestGraphIndicatorScoreBar({
  score,
  scoreThreshold,
}: InterestGraphIndicatorScoreBarProps) {
  return (
    <Box
      width={1}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.dark}
      position="relative"
      overflow="hidden"
    >
      <Box
        component={motion.div}
        height={30}
        borderRadius={1}
        bgcolor={(theme) => theme.palette.primary.main}
        initial={{ width: 0 }}
        animate={{ width: `${(score / scoreThreshold) * 100}%` }}
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      />
      <Typography
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={12}
        fontWeight={400}
        sx={{
          color: (theme) => theme.palette.common.white,
        }}
      >
        {score}/{scoreThreshold}
      </Typography>
    </Box>
  )
}
