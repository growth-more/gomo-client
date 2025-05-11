import { Button } from '@/components/button'
import { Interest } from '@/entities/interest'
import { SelectInterest } from '@/views/interest/components'
import { CreateQuestModalStep } from '@/views/quest/modals/create-quest/create-quest-modal'
import { Stack, Typography } from '@mui/material'
import { useEnter } from '@/hooks'
interface CreateQuestModalS2Props extends CreateQuestModalStep {
  interest: Interest | null
  setInterest: (interest: Interest) => void
}

export function CreateQuestModalS2({
  onCancel,
  onNext,
  interest,
  setInterest,
}: CreateQuestModalS2Props) {
  useEnter(() => {
    if (interest !== null) {
      onNext?.()
    }
  })

  return (
    <Stack height={1} justifyContent="space-between" spacing={2} overflow="hidden">
      <Stack spacing={3} flex={1} overflow="hidden">
        <Typography fontSize={18} fontWeight={600} noWrap flexShrink={0}>
          퀘스트가 어떤 관심사에 속하나요?
        </Typography>
        <SelectInterest selected={interest} onChanged={setInterest} sx={{ height: 1 }} />
      </Stack>

      <Stack spacing={1} flexShrink={0}>
        <Button.Primary
          label="퀘스트 생성하기"
          size="large"
          onClick={onNext}
          disabled={interest === null}
        />
        <Button.Plain label="취소" size="small" onClick={onCancel} />
      </Stack>
    </Stack>
  )
}
