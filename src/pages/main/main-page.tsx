import { FullContainer } from '@/components/container'
import { SxProps, Theme } from '@mui/material'
import { ControlPanel } from './components/control-panel'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/room.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainPage() {
  return (
    <FullContainer sx={{ ...backgroundSx, position: 'relative' }}>
      <ControlPanel />
    </FullContainer>
  )
}
