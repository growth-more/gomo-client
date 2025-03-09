import { RepeatQuest } from '@/entities'
import { alpha, Stack } from '@mui/material'
import { RefObject } from 'react'
import { Reorder } from 'motion/react'
import { QuestItem } from '@/components/quest'

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
  // const { deleteQuest } = useAssignQuest()
  // const { addViewWithId } = useWindowStore()

  // const deleteHandler = useCallback(() => {
  //   deleteQuest({ id: quest.id })
  // }, [deleteQuest, quest.id])

  // const editHandler = useCallback(() => {
  //   addViewWithId(UPDATE_QUEST_PAGE_ID(quest.id), UPDATE_QUEST_PAGE_VIEW(quest))
  // }, [addViewWithId, quest])

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
        // onDelete={deleteHandler}
        // onEdit={editHandler}
        // useDelete
        // useEdit
      />
    </Stack>
  )
}
