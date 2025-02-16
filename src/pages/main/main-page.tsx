import { FullContainer } from '@/components/container'
import { useWindowStore } from '@/stores'
import { Button } from '@mui/material'

export function MainPage() {
  const { addView } = useWindowStore()

  const createWindowViewHandler = () => {
    addView({
      title: 'Window',
      resizable: true,
      closable: true,
    })
  }

  return (
    <FullContainer>
      <Button onClick={createWindowViewHandler}>Create New Window View</Button>
    </FullContainer>
  )
}
