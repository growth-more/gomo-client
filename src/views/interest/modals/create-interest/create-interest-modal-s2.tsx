import { Button } from '@/components/button'
import { Interest } from '@/entities/interest'
import { useEnter } from '@/hooks'
import { SelectInterest } from '@/views/interest/components'
import { CreateInterestModalStep } from '@/views/interest/modals/create-interest/create-interest-modal'
import { Stack, Typography } from '@mui/material'

interface CreateInterestModalS2Props extends CreateInterestModalStep {
  interest: Interest | null
  setInterest: (interest: Interest | null) => void
}

export function CreateInterestModalS2({
  onCancel,
  onNext,
  interest,
  setInterest,
}: CreateInterestModalS2Props) {
  useEnter(() => {
    onNext?.()
  })

  return (
    <Stack height={1} justifyContent="space-between" spacing={2} overflow="hidden">
      <Stack spacing={3} flex={1} overflow="hidden">
        <Stack spacing={1}>
          <Typography fontSize={18} fontWeight={600} noWrap flexShrink={0}>
            어떤 관심사에 속하나요?
          </Typography>
          <Typography fontSize={14} color="text.secondary" noWrap flexShrink={0}>
            상위 관심사를 정해주세요.
          </Typography>
        </Stack>
        <SelectInterest
          selected={interest}
          onChanged={setInterest}
          sx={{ height: 1 }}
          enableNoneOption
          noneOptionLabel="상위 관심사 없음"
          onNoneOption={() => setInterest(null)}
        />
      </Stack>

      <Stack spacing={1}>
        <Button.Primary label="다음" size="large" onClick={onNext} />
        <Button.Plain label="취소" size="small" onClick={onCancel} />
      </Stack>
    </Stack>
  )
}
