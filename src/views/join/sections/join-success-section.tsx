import { Iconify } from '@/components/iconify'
import { paths } from '@/routes'
import { Button, Typography } from '@mui/material'

import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'

interface JoinSuccessSectionProps {
  onSurvey?: () => void
  onSkip?: () => void
}

export function JoinSuccessSection({ onSurvey, onSkip }: JoinSuccessSectionProps) {
  return (
    <Stack width={1} height={1} p={6} justifyContent="center" alignItems="center">
      <Stack height={1} maxHeight={400} justifyContent="space-between" alignItems="center" gap={4}>
        <Stack alignItems="center" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="h5">GOMO 가입이</Typography>
            <Typography variant="h5">완료되었습니다</Typography>
          </Stack>

          <Iconify icon="duo-icons:approved" width={60} sx={{ color: 'primary.main' }} />

          <Stack alignItems="center">
            <Typography variant="subtitle1" fontWeight={400} color="text.secondary">
              앞으로 모든 순간을
            </Typography>
            <Typography variant="subtitle1" fontWeight={400} color="text.secondary">
              GOMO와 함께하세요
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            초기설정을 통해 쉽고 빠르게 시작해보세요
          </Typography>
          <Button size="large" sx={{ width: 300 }} onClick={onSurvey}>
            초기설정하기
          </Button>
          <Button
            component={Link}
            to={paths.root}
            color="secondary"
            sx={{ width: 300 }}
            onClick={onSkip}
          >
            다음에 할래요
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
