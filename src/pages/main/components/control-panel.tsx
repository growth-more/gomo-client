import { Stack } from '@mui/material'
import { ControlButton } from './control-button'
import { useWindowStore } from '@/stores'
import { QuestPage } from '@/pages/quest/quest-page'

export function ControlPanel() {
  const { toggleViewWithId } = useWindowStore()

  const questViewHandler = () => {
    toggleViewWithId('quest', {
      title: '퀘스트',
      closable: true,
      resizable: true,
      minWidth: 320,
      minHeight: 350,
      maxWidth: 800,
      maxHeight: 800,
      defaultSize: { width: 320, height: 450 },
      children: <QuestPage />,
    })
  }

  return (
    <Stack position="fixed" left={0} bottom={0} p={4}>
      <ControlButton title="퀘스트" icon="solar:star-bold" onClick={questViewHandler} />
    </Stack>
  )
}
