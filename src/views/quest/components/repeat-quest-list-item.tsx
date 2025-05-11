import { useContextMenu } from '@/components/context-menu'
import { IconButtons } from '@/components/icon-button'
import { Iconify } from '@/components/iconify'
import { QUEST_TYPE, RepeatQuest } from '@/entities/quest'
import { Stack, Typography } from '@mui/material'

interface RepeatQuestListItemProps {
  quest: RepeatQuest
  enableMenu?: boolean
}

export function RepeatQuestListItem({ quest, enableMenu }: RepeatQuestListItemProps) {
  const onContextMenu = useContextMenu([
    [
      {
        label: '반복퀘스트 이름 변경',
      },
      {
        label: '반복퀘스트 관심사 변경',
      },
    ],
    [
      {
        label: '반복퀘스트 삭제',
        type: 'danger',
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
