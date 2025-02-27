import { AssignQuest } from '@/entities'
import { alpha, Stack } from '@mui/material'
import { RefObject, useCallback } from 'react'
import { useAssignQuest } from '@/api/hooks'
import { Reorder } from 'motion/react'
import { useWindowStore } from '@/stores'
import { UPDATE_QUEST_PAGE_ID, UPDATE_QUEST_PAGE_VIEW } from '@/constants/window-view'
import { QuestItem } from '@/components/quest'

interface QuestListProps {
  quest: AssignQuest
  onDragStart: () => void
  onDragEnd: () => void
  constraints: RefObject<HTMLDivElement>
}

export function QuestList({ quest, onDragStart, onDragEnd, constraints }: QuestListProps) {
  const { completeQuest, confirmQuest, deleteQuest } = useAssignQuest()
  const { addViewWithId } = useWindowStore()

  const completeHandler = useCallback(() => {
    completeQuest({ id: quest.id, body: { proof: '' } })
  }, [completeQuest, quest.id])

  const confirmHandler = useCallback(() => {
    confirmQuest({ id: quest.id })
  }, [confirmQuest, quest.id])

  const deleteHandler = useCallback(() => {
    deleteQuest({ id: quest.id })
  }, [deleteQuest, quest.id])

  const editHandler = useCallback(() => {
    addViewWithId(UPDATE_QUEST_PAGE_ID(quest.id), UPDATE_QUEST_PAGE_VIEW(quest))
  }, [addViewWithId, quest])

  return (
    <Stack
      component={Reorder.Item}
      value={quest}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragConstraints={constraints}
      dragElastic={0}
    >
      <QuestItem
        content={quest.content}
        questType={quest.questType}
        labelColor={(theme) => alpha(theme.palette.primary.main, 1)}
        point={quest.point}
        score={quest.score}
        useConfirm={!quest.completed && !quest.confirmed}
        useDelete={!quest.completed && !quest.confirmed}
        useEdit={!quest.completed && !quest.confirmed}
        useComplete={!quest.completed && quest.confirmed}
        onConfirm={confirmHandler}
        onDelete={deleteHandler}
        onEdit={editHandler}
        onComplete={completeHandler}
      />
    </Stack>
  )
}
