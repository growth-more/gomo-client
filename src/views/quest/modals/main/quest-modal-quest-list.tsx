import { AssignQuest, QuestType, QuestStatus } from '@/entities/quest'
import { QuestList } from '@/views/quest/components'
import { QuestListCreate } from '@/views/quest/components/quest-list-create'
import { QuestListEmpty } from '@/views/quest/components/quest-list-empty'
import { QuestModalTitle } from '@/views/quest/modals/main/quest-modal-title'
import { Stack } from '@mui/material'

interface QuestModalQuestListProps {
  quests: AssignQuest[]
  questType: QuestType
  questStatus: QuestStatus
  checkHandler?: (id: string, checked: boolean) => void
  initHash?: number
}

export function QuestModalQuestList({
  quests,
  questStatus,
  questType,
  checkHandler,
  initHash,
}: QuestModalQuestListProps) {
  return (
    <Stack spacing={2}>
      <QuestModalTitle questStatus={questStatus} count={quests.length} />
      {quests.length > 0 ? (
        <QuestList
          quests={quests}
          checkHandler={checkHandler}
          disableDivider
          enableMenu
          initHash={initHash}
        />
      ) : (
        <QuestListEmpty questStatus={questStatus} questType={questType} />
      )}
      {questStatus === 'UNCONFIRMED' && <QuestListCreate questType={questType} />}
    </Stack>
  )
}
