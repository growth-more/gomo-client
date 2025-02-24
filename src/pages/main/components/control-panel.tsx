import { Stack } from '@mui/material'
import { ControlButton } from './control-button'
import { useWindowStore } from '@/stores'
import { QUEST_PAGE_ID, QUEST_PAGE_VIEW } from '@/constants/window-view'

export function ControlPanel() {
  const { toggleViewWithId } = useWindowStore()

  const questViewHandler = () => {
    toggleViewWithId(QUEST_PAGE_ID, QUEST_PAGE_VIEW)
  }

  return (
    <Stack position="fixed" left={0} bottom={0} p={4}>
      <ControlButton title="퀘스트" icon="solar:star-bold" onClick={questViewHandler} />
    </Stack>
  )
}
