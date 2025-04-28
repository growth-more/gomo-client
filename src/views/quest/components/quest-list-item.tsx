import { useAssignQuest } from '@/api/hooks'
import { Checkbox } from '@/components/checkbox'
import { useContextMenu } from '@/components/context-menu'
import { IconButton } from '@/components/icon-button'
import { Iconify } from '@/components/iconify'
import { QUEST_TYPE_LABEL } from '@/constants'
import { AssignQuest } from '@/entities'
import { IContextMenuItem } from '@/stores/use-context-menu-store'
import { useModalStore } from '@/stores/use-modal-store'
import {
  UPDATE_QUEST_INTEREST_MODAL_ID,
  UpdateQuestInterestModal,
} from '@/views/quest/modals/update-quest/update-quest-interest-modal'
import {
  UPDATE_QUEST_NAME_MODAL_ID,
  UpdateQuestNameModal,
} from '@/views/quest/modals/update-quest/update-quest-name-modal'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

interface QuestListItemProps {
  quest: AssignQuest
  selected: boolean
  initHash?: number
  onChanged?: (checked: boolean) => void
  onDisabled?: () => void
  enableMenu?: boolean
}

export function QuestListItem({
  quest,
  selected,
  onChanged,
  onDisabled,
  initHash,
  enableMenu,
}: QuestListItemProps) {
  const { addModal } = useModalStore()
  const { confirmQuest, completeQuest, deleteQuest } = useAssignQuest()

  const [hash, setHash] = useState(initHash)
  const [checked, setChecked] = useState(selected)

  const contextMenu = useMemo(() => {
    const context: IContextMenuItem[][] = [
      [],
      [
        {
          label: '퀘스트 이름 변경',
          onClick: () =>
            addModal(UPDATE_QUEST_NAME_MODAL_ID, <UpdateQuestNameModal quest={quest} />),
          disabled: quest.confirmed,
        },
        {
          label: '퀘스트 관심사 변경',
          onClick: () =>
            addModal(UPDATE_QUEST_INTEREST_MODAL_ID, <UpdateQuestInterestModal quest={quest} />),
          disabled: quest.confirmed,
        },
      ],
      [
        {
          label: '퀘스트 포기',
          type: 'danger',
          onClick: () => deleteQuest(quest.id),
          disabled: quest.confirmed,
        },
      ],
    ]

    // 대기중인 퀘스트
    if (!quest.confirmed) {
      context[0] = [
        {
          label: '퀘스트 수락',
          onClick: () => confirmQuest(quest.id),
        },
      ]
    }

    // 진행중인 퀘스트
    if (quest.confirmed && !quest.completed) {
      context[0].push({
        label: '퀘스트 완료',
        onClick: () => completeQuest(quest.id, { proof: '테스트' }),
      })
    }

    // 완료한 퀘스트
    if (quest.completed) {
      context[0].push({
        label: '퀘스트 완료',
        disabled: true,
      })
    }

    return context
  }, [addModal, confirmQuest, completeQuest, deleteQuest, quest])

  const onContextMenu = useContextMenu(contextMenu)

  const checkHandler = (checked: boolean) => {
    setChecked(checked)
    onChanged?.(checked)
  }

  useEffect(() => {
    if (hash === initHash) {
      setChecked(selected)
      return
    }
    setHash(initHash)
  }, [initHash, hash, selected])

  useEffect(() => {
    setChecked(selected)
  }, [selected])

  return (
    <Stack
      p={1}
      direction="row"
      justifyContent="space-between"
      borderRadius={1}
      sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
      onContextMenu={onContextMenu}
    >
      <Stack overflow="hidden">
        <Stack direction="row" alignItems="center" gap={1}>
          <Checkbox
            checked={checked}
            onChanged={checkHandler}
            disableUncheck={selected}
            onDisabled={onDisabled}
          />
          <Typography fontSize={15} fontWeight={500} noWrap>
            {quest.content}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box width={30} />
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">{QUEST_TYPE_LABEL[quest.questType]}퀘스트</Typography>
            <Iconify icon="mdi:dot" sx={{ width: 15 }} width={15} />
            <Typography variant="caption">{quest.subjectName}</Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ ml: 0.5, color: (theme) => theme.palette.primary.main }}
            >
              +{quest.score}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {enableMenu && <IconButton.Menu onClick={onContextMenu} />}
    </Stack>
  )
}
