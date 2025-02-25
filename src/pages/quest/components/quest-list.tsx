import { Iconify } from '@/components/iconify'
import { AssignQuest } from '@/entities'
import { alpha, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { QuestScore } from './quest-score'
import { RefObject, useCallback, useMemo } from 'react'
import { useAssignQuest } from '@/api/hooks'
import { Reorder } from 'motion/react'
import { useWindowStore } from '@/stores'
import { UPDATE_QUEST_PAGE_ID, UPDATE_QUEST_PAGE_VIEW } from '@/constants/window-view'

interface QuestListProps {
  quest: AssignQuest
  questTypeLabel: string
  onDragStart: () => void
  onDragEnd: () => void
  constraints: RefObject<HTMLDivElement>
}

export function QuestList({
  quest,
  questTypeLabel,
  onDragStart,
  onDragEnd,
  constraints,
}: QuestListProps) {
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

  const actionRender = useMemo(() => {
    if (quest.completed) {
      return null
    }
    if (quest.confirmed) {
      return (
        <>
          <Tooltip title="퀘스트 완료">
            <IconButton size="small" onClick={completeHandler}>
              <Iconify icon="mdi:check" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
    return (
      <>
        <Tooltip title="퀘스트 삭제">
          <IconButton size="small" onClick={deleteHandler}>
            <Iconify icon="material-symbols:close-rounded" />
          </IconButton>
        </Tooltip>
        <Tooltip title="퀘스트 수정">
          <IconButton size="small" onClick={editHandler}>
            <Iconify icon="lets-icons:edit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="퀘스트 수락">
          <IconButton size="small" onClick={confirmHandler}>
            <Iconify icon="mdi:check" />
          </IconButton>
        </Tooltip>
      </>
    )
  }, [quest, completeHandler, confirmHandler, deleteHandler, editHandler])

  return (
    <Stack
      height={100}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
      borderRadius={1}
      border={1}
      borderColor="divider"
      overflow="hidden"
      sx={{ backdropFilter: 'blur(10px)' }}
      component={Reorder.Item}
      value={quest}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragConstraints={constraints}
      dragElastic={0}
    >
      <Box width="5px" height={1} bgcolor={(theme) => alpha(theme.palette.primary.main, 1)} />

      <Stack width={1} p={1} justifyContent="space-between">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography fontSize={14}>{quest.content}</Typography>
          <Typography
            fontSize={12}
            color="white"
            px={1}
            py={0.5}
            bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
            borderRadius={1}
          >
            {questTypeLabel}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="space-between" height={30}>
          <Stack direction="row" spacing={0.5}>
            <QuestScore score={quest.score} icon="solar:star-bold" />
            <QuestScore score={quest.score} icon="mingcute:coin-3-fill" />
          </Stack>
          <Stack direction="row" spacing={0.5}>
            {actionRender}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
