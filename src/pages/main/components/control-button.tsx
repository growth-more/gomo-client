import { Iconify } from '@/components/iconify'
import { alpha, Box, Tooltip } from '@mui/material'
import { motion } from 'framer-motion'

interface ControlButtonProps {
  title: string
  icon: string
  onClick?: () => void
}

export function ControlButton({ title, icon, onClick }: ControlButtonProps) {
  return (
    <Tooltip title={title}>
      <Box
        component={motion.button}
        sx={{
          width: 50,
          height: 50,
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.3),
          backdropFilter: 'blur(4px)',
          borderRadius: 1,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.1 }}
        onClick={onClick}
      >
        <Iconify icon={icon} width={30} color="white" />
      </Box>
    </Tooltip>
  )
}
