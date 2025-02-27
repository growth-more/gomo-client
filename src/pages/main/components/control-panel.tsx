import { Stack } from '@mui/material'
import { ControlButton } from './control-button'
import { useWindowStore } from '@/stores'
import {
  PROFILE_PAGE_ID,
  PROFILE_PAGE_VIEW,
  QUEST_PAGE_ID,
  QUEST_PAGE_VIEW,
  HISTORY_PAGE_ID,
  HISTORY_PAGE_VIEW,
} from '@/constants/window-view'

export function ControlPanel() {
  const { toggleViewWithId } = useWindowStore()

  const questViewHandler = () => {
    toggleViewWithId(QUEST_PAGE_ID, QUEST_PAGE_VIEW)
  }

  const profileViewHandler = () => {
    toggleViewWithId(PROFILE_PAGE_ID, PROFILE_PAGE_VIEW)
  }

  const historyViewHandler = () => {
    toggleViewWithId(HISTORY_PAGE_ID, HISTORY_PAGE_VIEW)
  }

  return (
    <Stack position="fixed" direction="row" left={0} bottom={0} p={4} spacing={2}>
      <ControlButton title="퀘스트" icon="solar:star-bold" onClick={questViewHandler} />
      <ControlButton title="프로필" icon="solar:user-bold" onClick={profileViewHandler} />
      <ControlButton title="기록" icon="solar:history-bold" onClick={historyViewHandler} />
    </Stack>
  )
}
