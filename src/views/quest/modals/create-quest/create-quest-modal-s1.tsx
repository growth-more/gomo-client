import { Button } from '@/components/button'
import { useEnter } from '@/hooks'
import { CreateQuestModalStep } from '@/views/quest/modals/create-quest/create-quest-modal'
import { Stack, TextField, Typography } from '@mui/material'

interface CreateQuestModalS1Props extends CreateQuestModalStep {
  name: string
  setName: (name: string) => void
}

export function CreateQuestModalS1({ onCancel, onNext, name, setName }: CreateQuestModalS1Props) {
  useEnter(() => {
    if (name.trim().length > 0) {
      onNext?.()
    }
  })

  return (
    <Stack height={1} justifyContent="space-between" spacing={2}>
      <Stack spacing={3}>
        <Typography fontSize={18} fontWeight={600} noWrap>
          퀘스트 이름이 무엇인가요?
        </Typography>
        <TextField
          fullWidth
          autoFocus
          label="퀘스트 이름"
          placeholder="퀘스트 이름을 입력해주세요"
          variant="standard"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>
      <Stack spacing={1}>
        <Button.Primary
          label="다음"
          size="large"
          onClick={onNext}
          disabled={name.trim().length === 0}
        />
        <Button.Plain label="취소" size="small" onClick={onCancel} />
      </Stack>
    </Stack>
  )
}
