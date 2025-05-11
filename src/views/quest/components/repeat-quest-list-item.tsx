import { useRepeatQuest } from '@/api/hooks'
import { useContextMenu } from '@/components/context-menu'
import { IconButtons } from '@/components/icon-button'
import { Iconify } from '@/components/iconify'
import { DANGER_DIALOG_ID } from '@/components/modal'
import { QUEST_TYPE, RepeatQuest } from '@/entities/quest'
import { useModalStore } from '@/stores/use-modal-store'
import { RepeatQuestDeleteDialog } from '@/views/quest/components/repeat-quest-delete-dialog'
import {
  UPDATE_REPEAT_QUEST_INTEREST_MODAL_ID,
  UpdateRepeatQuestInterestModal,
} from '@/views/quest/modals/update-quest/update-repeat-quest-interest-modal'
import {
  UPDATE_REPEAT_QUEST_NAME_MODAL_ID,
  UpdateRepeatQuestNameModal,
} from '@/views/quest/modals/update-quest/update-repeat-quest-name-modal'
import { Stack, Typography } from '@mui/material'

interface RepeatQuestListItemProps {
  quest: RepeatQuest
  enableMenu?: boolean
}

export function RepeatQuestListItem({ quest, enableMenu }: RepeatQuestListItemProps) {
  const { addModal } = useModalStore()
  const { deleteQuest } = useRepeatQuest()

  const onContextMenu = useContextMenu([
    [
      {
        label: '반복퀘스트 이름 변경',
        onClick: () =>
          addModal(UPDATE_REPEAT_QUEST_NAME_MODAL_ID, <UpdateRepeatQuestNameModal quest={quest} />),
      },
      {
        label: '반복퀘스트 관심사 변경',
        onClick: () =>
          addModal(
            UPDATE_REPEAT_QUEST_INTEREST_MODAL_ID,
            <UpdateRepeatQuestInterestModal quest={quest} />
          ),
      },
    ],
    [
      {
        label: '반복퀘스트 삭제',
        type: 'danger',
        onClick: () =>
          addModal(
            DANGER_DIALOG_ID,
            <RepeatQuestDeleteDialog onSuccess={() => deleteQuest(quest.id)} />
          ),
      },
    ],
  ])

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
        <Typography fontSize={15} fontWeight={500} noWrap height={30}>
          {quest.content}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Typography variant="caption">{QUEST_TYPE[quest.questType].label}</Typography>
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
      {enableMenu && <IconButtons.Menu onClick={onContextMenu} />}
    </Stack>
  )
}
