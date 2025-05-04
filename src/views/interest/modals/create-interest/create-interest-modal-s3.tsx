import { Button } from '@/components/button'
import { SelectInterestColor, SelectInterestImage } from '@/views/interest/components'
import { CreateInterestModalStep } from '@/views/interest/modals/create-interest/create-interest-modal'
import { Stack, Typography } from '@mui/material'

interface CreateInterestModalS3Props extends CreateInterestModalStep {
  color: string | null
  setColor: (color: string | null) => void
  file: File | null
  setFile: (file: File | null) => void
}

export function CreateInterestModalS3({
  onCancel,
  onNext,
  color,
  setColor,
  file,
  setFile,
}: CreateInterestModalS3Props) {
  return (
    <Stack height={1} justifyContent="space-between" spacing={2}>
      <Stack spacing={2} flex={1} overflow="hidden">
        <Typography fontSize={18} fontWeight={600} noWrap flexShrink={0}>
          관심사 로고와 색상을 정해주세요.
        </Typography>

        <Stack flex={1} spacing={3} alignItems="center" justifyContent="center">
          <SelectInterestImage file={file} onChange={setFile} color={color} />
          <SelectInterestColor color={color} onChange={setColor} />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Button.Primary label="관심사 생성하기" size="large" onClick={onNext} />
        <Button.Plain label="취소" size="small" onClick={onCancel} />
      </Stack>
    </Stack>
  )
}
