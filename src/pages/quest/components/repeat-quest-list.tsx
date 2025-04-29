import { RepeatQuest } from '@/entities/quest'
import { alpha, Stack } from '@mui/material'
import { RefObject, useCallback } from 'react'
import { Reorder } from 'motion/react'
import { QuestItem } from '@/components/quest'
import { useRepeatQuest } from '@/api/hooks'
import { useWindowStore } from '@/stores'
import { REPEAT_QUEST_UPDATE_PAGE_ID, REPEAT_QUEST_UPDATE_PAGE_VIEW } from '@/constants/window-view'

interface RepeatQuestListProps {
  quest: RepeatQuest
  onDragStart: () => void
  onDragEnd: () => void
  constraints: RefObject<HTMLDivElement>
}

export function RepeatQuestList({
  quest,
  onDragStart,
  onDragEnd,
  constraints,
}: RepeatQuestListProps) {
  const { deleteRepeatQuest } = useRepeatQuest()
  const { addViewWithId } = useWindowStore()

  const deleteHandler = useCallback(() => {
    deleteRepeatQuest(quest.id)
  }, [deleteRepeatQuest, quest.id])

  const editHandler = useCallback(() => {
    addViewWithId(REPEAT_QUEST_UPDATE_PAGE_ID(quest.id), REPEAT_QUEST_UPDATE_PAGE_VIEW(quest))
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
        onDelete={deleteHandler}
        onEdit={editHandler}
        useDelete
        useEdit
      />
    </Stack>
  )
}
