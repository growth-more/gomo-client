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
      children: <QuestPage />,
    })
  }

  return (
    <Stack position="fixed" left={0} bottom={0} p={4}>
      <ControlButton title="퀘스트" icon="mingcute:coin-3-fill" onClick={questViewHandler} />
    </Stack>
  )
}
