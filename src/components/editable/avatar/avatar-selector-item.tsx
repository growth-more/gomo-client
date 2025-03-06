import { Stack, StackProps, SxProps, Theme } from '@mui/material'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface AvatarSelectorItemProps extends StackProps {
  sx?: SxProps<Theme>
  children?: ReactNode
}

export function AvatarSelectorItem({ sx, children, ...stackProps }: AvatarSelectorItemProps) {
  return (
    <Stack
      component={motion.button}
      flex={1}
      border={1}
      borderColor="divider"
      borderRadius={1}
      boxShadow={1}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ cursor: 'pointer', ...sx }}
      p={2}
      {...stackProps}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </Stack>
  )
}
