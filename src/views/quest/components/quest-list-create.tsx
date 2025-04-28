import { Button } from '@/components/button'
import { QuestType } from '@/entities/quests'
import { useModalStore } from '@/stores/use-modal-store'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'

interface QuestListCreateProps {
  questType: QuestType
}

export function QuestListCreate({ questType }: QuestListCreateProps) {
  const { addModal } = useModalStore()

  const createHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type={questType} />)
  }

  return <Button.Plain label="새 퀘스트 만들기" onClick={createHandler} sx={{ height: 40 }} />
}
