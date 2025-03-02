import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'

interface ScoreBarProps {
  score: number
  scoreThreshold: number
}

export function ScoreBar({ score, scoreThreshold }: ScoreBarProps) {
  return (
    <Box
      width={1}
      p={0.5}
      bgcolor={(theme) => theme.palette.grey[900]}
      borderRadius={1}
      position="relative"
    >
      <Box
        component={motion.div}
        p={1}
        borderRadius={1}
        bgcolor={(theme) => theme.palette.primary.light}
        initial={{ width: 0 }}
        animate={{ width: `${(score / scoreThreshold) * 100}%` }}
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
      >
        {score}/{scoreThreshold}
      </Typography>
    </Box>
  )
}
