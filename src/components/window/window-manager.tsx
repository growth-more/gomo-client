import { Box } from '@mui/material'
import { createPortal } from 'react-dom'
import { FullContainer } from '../container'
import { useEffect, useMemo, useState } from 'react'
import { useWindowStore } from '@/stores'
import { WindowView } from './window-view'
import { AnimatePresence } from 'motion/react'

export function WindowManager() {
  const { views } = useWindowStore()

  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const root = document.getElementById('root')!
    setAnchor(root)
  }, [])

  const windowManager = useMemo(
    () => (
      <FullContainer
        sx={{
          p: '10px',
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box id="window-manager" width={1} height={1}>
          <Box sx={{ pointerEvents: 'auto' }}>
            <AnimatePresence>
              {views.map((view) => (
                <WindowView key={view.id} {...view.props} />
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </FullContainer>
    ),
    [views]
  )

  return anchor ? createPortal(windowManager, anchor) : null
}
