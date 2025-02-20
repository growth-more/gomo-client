import { useMemberProfile } from '@/api/hooks'
import { FullContainer } from '@/components/container'
import { useWindowStore } from '@/stores'
import { Button, Typography } from '@mui/material'

export function MainPage() {
  const { addView } = useWindowStore()

  const { profile } = useMemberProfile()

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
      <Typography>{JSON.stringify(profile)}</Typography>
    </FullContainer>
  )
}
