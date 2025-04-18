import { Box, IconButton, Stack, Typography } from '@mui/material'
import { motion } from 'motion/react'

interface StepProps {
  label: string
  completed?: boolean
  clickable?: boolean
  onClick?: () => void
}

export function Step({ label, completed, clickable, onClick }: StepProps) {
  return (
    <IconButton sx={{ borderRadius: 1, flex: 1 }} disabled={!clickable} onClick={onClick}>
      <Stack width={1} spacing={1} alignItems="flex-start">
        <Box
          width={1}
          height={3}
          bgcolor={(theme) => theme.palette.background.dark}
          borderRadius={1}
        >
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
            color: (theme) =>
              completed ? theme.palette.primary.main : theme.palette.text.secondary,
          }}
          noWrap
        >
          {label}
        </Typography>
      </Stack>
    </IconButton>
  )
}
