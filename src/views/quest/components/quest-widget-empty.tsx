import { Iconify } from '@/components/iconify'
import { useModalStore } from '@/stores/use-modal-store'
import { CREATE_QUEST_MODAL_ID, CreateQuestModal } from '@/views/quest/modals'
import { Button, Stack, Typography } from '@mui/material'

type QuestEmptyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CONFIRMED' | 'UNCONFIRMED'

const QUEST_EMPTY_TEXT: Record<QuestEmptyType, { title: string; subtitle: string }> = {
  DAILY: {
    title: '일일 퀘스트가 없습니다.',
    subtitle: '대기중인 퀘스트에서 일일 퀘스트를 수락해보세요.',
  },
  WEEKLY: {
    title: '주간 퀘스트가 없습니다.',
    subtitle: '대기중인 퀘스트에서 주간 퀘스트를 수락해보세요.',
  },
  MONTHLY: {
    title: '월간 퀘스트가 없습니다.',
    subtitle: '대기중인 퀘스트에서 월간 퀘스트를 수락해보세요.',
  },
  CONFIRMED: {
    title: '진행중인 퀘스트가 없습니다.',
    subtitle: '대기중인 퀘스트에서 퀘스트를 수락해보세요.',
  },
  UNCONFIRMED: {
    title: '시작 가능한 퀘스트가 없습니다.',
    subtitle: '직접 퀘스트를 생성해보세요.',
  },
}

interface QuestWidgetEmptyProps {
  type: QuestEmptyType
}

export function QuestWidgetEmpty({ type }: QuestWidgetEmptyProps) {
  const { addModal } = useModalStore()

  const createQuestHandler = () => {
    addModal(CREATE_QUEST_MODAL_ID, <CreateQuestModal type="DAILY" />)
  }

  return (
    <Stack
      width={1}
      height={1}
      alignItems="center"
      justifyContent="center"
      spacing={1}
      bgcolor={(theme) => theme.palette.background.light}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.divider}
      sx={{ borderStyle: 'dashed' }}
    >
      <Iconify icon="material-symbols-light:folder-open-outline-rounded" width={50} />
      <Stack spacing={2} alignItems="center">
        <Stack alignItems="center">
          <Typography fontSize={16} fontWeight={500} color="text.secondary">
            {QUEST_EMPTY_TEXT[type].title}
          </Typography>
          <Typography fontSize={12} fontWeight={400} color="text.secondary">
            {QUEST_EMPTY_TEXT[type].subtitle}
          </Typography>
        </Stack>
        {type === 'UNCONFIRMED' && (
          <Button variant="contained" color="primary" onClick={createQuestHandler}>
            일일 퀘스트 생성하기
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
