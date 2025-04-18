import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'motion/react'

interface StepProps {
  label: string
  completed?: boolean
}

export function Step({ label, completed }: StepProps) {
  return (
    <Stack width={1} spacing="5px">
      <Box width={1} height={3} bgcolor={(theme) => theme.palette.background.dark} borderRadius={1}>
        <Box
          height={1}
          bgcolor={(theme) => theme.palette.primary.main}
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: completed ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </Box>
      <Typography
        fontSize={14}
        fontWeight={completed ? 500 : 400}
        sx={{
          color: (theme) => (completed ? theme.palette.primary.main : theme.palette.text.secondary),
        }}
      >
        {label}
      </Typography>
    </Stack>
  )
}
