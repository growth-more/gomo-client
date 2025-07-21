import { CircularProgress, Stack } from '@mui/material'
import { ReactNode } from 'react'

interface StreakCardProps {
  children: ReactNode
  isLoading: boolean
}

export function StreakCard({ children, isLoading }: StreakCardProps) {
  return (
    <Stack
      p={2}
      flex={1}
      minWidth={140}
      height={110}
      border={1}
      borderRadius={1}
      bgcolor={(theme) => theme.palette.background.main}
      borderColor={(theme) => theme.palette.border.main}
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      {isLoading ? <CircularProgress /> : children}
    </Stack>
  )
}
