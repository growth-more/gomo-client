import { Button } from '@/components/button'
import { QuestType } from '@/entities/quest'
import { useModalStore } from '@/stores/use-modal-store'
import {
  CREATE_REPEAT_QUEST_MODAL_ID,
  CreateRepeatQuestModal,
} from '@/views/quest/modals/create-quest/create-repeat-quest-modal'

interface RepeatQuestListCreateProps {
  questType: QuestType
}

export function RepeatQuestListCreate({ questType }: RepeatQuestListCreateProps) {
  const { addModal } = useModalStore()

  const createHandler = () => {
    addModal(CREATE_REPEAT_QUEST_MODAL_ID, <CreateRepeatQuestModal type={questType} />)
  }

  return <Button.Light label="새 반복퀘스트 만들기" onClick={createHandler} sx={{ height: 40 }} />
}
