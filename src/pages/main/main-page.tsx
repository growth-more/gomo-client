import { FullContainer } from '@/components/container'
import { Window } from '@/components/window'
import { Box } from '@mui/material'

export function MainPage() {
  return (
    <FullContainer>
      <Window>
        <Box>Hello</Box>
      </Window>
      <Window resizable>
        <Box>Hello</Box>
      </Window>
      <Window resizable closable>
        <Box>Hello</Box>
      </Window>
    </FullContainer>
  )
}
