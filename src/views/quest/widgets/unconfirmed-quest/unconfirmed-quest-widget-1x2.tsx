import { useAssignQuest } from '@/api/hooks'
import { DANGER_DIALOG_ID } from '@/components/modal'
import { Widget } from '@/components/widget'
import { useToggleSignal } from '@/hooks/use-toggle-signal'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestConfirmDialog, QuestList } from '@/views/quest/components'
import { QUEST_MODAL_ID, QuestModal } from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

export function UnconfirmedQuestWidget1x2() {
  const { daily, weekly, monthly, confirmQuest } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const quests = useMemo(() => {
    const sorted = _([...daily.unconfirmed, ...weekly.unconfirmed, ...monthly.unconfirmed])
      .sortBy('displayOrder')
      .take(6)
      .value()

    return [_.filter(sorted, (_, i) => i % 2 === 0), _.filter(sorted, (_, i) => i % 2 === 1)]
  }, [daily, weekly, monthly])

  const checkHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    addModal(
      DANGER_DIALOG_ID,
      <QuestConfirmDialog
        onSuccess={() => confirmQuest(id, { onError: () => initHash.toggle() })}
        onCancel={() => initHash.toggle()}
      />
    )
  }

  const openQuestHandler = () => {
    addModal(QUEST_MODAL_ID, <QuestModal initMenuId="DAILY_QUEST" />)
  }

  const unconfirmedCount = useMemo(() => {
    return daily.unconfirmed.length + weekly.unconfirmed.length + monthly.unconfirmed.length
  }, [daily, weekly, monthly])

  return (
    <Widget
      width={2}
      title="대기중인 퀘스트"
      subtitle={`${unconfirmedCount}개 퀘스트 대기 중`}
      onTitle={openQuestHandler}
    >
      <Stack
        p={1}
        spacing={0.5}
        direction="row"
        divider={<Box my={1} borderRight={1} borderColor={(theme) => theme.palette.border.main} />}
      >
        <QuestList
          quests={quests[0]}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
        <QuestList
          quests={quests[1]}
          checkHandler={checkHandler}
          sx={{ width: '50%' }}
          initHash={initHash.value}
        />
      </Stack>
    </Widget>
  )
}
