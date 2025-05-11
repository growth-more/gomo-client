import { useAssignQuest } from '@/api/hooks'
import { OrganizedAssignQuest, QuestType } from '@/entities/quest'
import { useModalStore } from '@/stores/use-modal-store'
import { QuestModalQuestList } from '@/views/quest/modals/main/assign-quest/quest-modal-quest-list'
import { QUEST_PROOF_MODAL_ID, QuestProofModal } from '@/views/quest/modals'
import { Box, Stack } from '@mui/material'
import { DANGER_DIALOG_ID } from '@/components/modal'
import { QuestConfirmDialog } from '@/views/quest/components'
import { useToggleSignal } from '@/hooks/use-toggle-signal'

interface QuestModalQuestSectionProps {
  quests: OrganizedAssignQuest
  questType: QuestType
}

export function QuestModalQuestSection({ quests, questType }: QuestModalQuestSectionProps) {
  const { confirmQuest } = useAssignQuest()
  const { addModal } = useModalStore()
  const initHash = useToggleSignal()

  const completeHandler = (id: string, checked: boolean) => {
    if (!checked) {
      return
    }
    addModal(
      QUEST_PROOF_MODAL_ID,
      <QuestProofModal id={id} onError={initHash.toggle} onCancel={initHash.toggle} />
    )
  }

  const confirmHandler = (id: string, checked: boolean) => {
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

  return (
    <Stack
      p={2}
      spacing={3}
      divider={<Box borderBottom={1} borderColor={(theme) => theme.palette.border.main} />}
    >
      <QuestModalQuestList
        questType={questType}
        questStatus="CONFIRMED"
        quests={quests.confirmed}
        checkHandler={completeHandler}
        initHash={initHash.value}
      />
      <QuestModalQuestList
        questType={questType}
        questStatus="UNCONFIRMED"
        quests={quests.unconfirmed}
        checkHandler={confirmHandler}
        initHash={initHash.value}
      />
      <QuestModalQuestList
        questType={questType}
        questStatus="COMPLETED"
        quests={quests.completed}
        checkHandler={completeHandler}
        initHash={initHash.value}
      />
    </Stack>
  )
}
