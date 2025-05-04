import { Button } from '@/components/button'
import { CreateInterestModalStep } from '@/views/interest/modals/create-interest/create-interest-modal'
import { Stack, TextField, Typography } from '@mui/material'

interface CreateInterestModalS1Props extends CreateInterestModalStep {
  name: string
  setName: (name: string) => void
}

export function CreateInterestModalS1({
  onCancel,
  onNext,
  name,
  setName,
}: CreateInterestModalS1Props) {
  return (
    <Stack height={1} justifyContent="space-between" spacing={2}>
      <Stack spacing={3}>
        <Typography fontSize={18} fontWeight={600} noWrap>
          관심사 이름이 무엇인가요?
        </Typography>
        <TextField
          fullWidth
          autoFocus
          label="관심사 이름"
          placeholder="관심사 이름을 입력해주세요"
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
