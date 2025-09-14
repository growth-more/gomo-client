import { FormInput } from '@/components/form'
import { Button, Collapse, Stack, Typography } from '@mui/material'
import { Control, UseFormWatch } from 'react-hook-form'
import { useTimer } from '@/hooks'
import { useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { JoinFieldInfo } from './join-field-info'
import { Form } from '@/views/join/sections'
import { useJoin } from '@/api/hooks'

dayjs.extend(duration)

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const VERIFY_CODE_TIME = 300

type VerifyCodeStatus = 'none' | 'pending' | 'verified'

interface EmailVerifyFormProps {
  control: Control<Form>
  watch: UseFormWatch<Form>
  onVerified?: () => void
  onUnverified?: () => void
}

export function EmailVerifyForm({
  control,
  watch,
  onVerified,
  onUnverified,
}: EmailVerifyFormProps) {
  const { createAuthCode, checkAuthCode } = useJoin()

  const [verifyCodeStatus, setVerifyCodeStatus] = useState<VerifyCodeStatus>('none')

  const verifyCodeTimer = useTimer(VERIFY_CODE_TIME)

  const email = watch('email')

  const requestVerifyCode = () => {
    setVerifyCodeStatus('pending')
    createAuthCode({ email })
    verifyCodeTimer.restart()
    onUnverified?.()
  }

  const checkVerifyCode = () => {
    const code = watch('verifyCode')
    checkAuthCode(email, code, {
      onSuccess: () => {
        setVerifyCodeStatus('verified')
        verifyCodeTimer.stop()
        onVerified?.()
      },
    })
  }

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} position="relative">
        <FormInput
          label="이메일"
          name="email"
          inputMode="email"
          type="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: '이메일을 입력해주세요',
            },
            pattern: {
              value: EMAIL_PATTERN,
              message: '올바른 이메일 주소를 입력해주세요',
            },
          }}
        />
        <Button
          sx={{ flexShrink: 0, width: 120, height: 40 }}
          onClick={requestVerifyCode}
          disabled={!email || !EMAIL_PATTERN.test(email)}
        >
          {verifyCodeStatus === 'none' ? '인증코드 전송' : '인증코드 재전송'}
        </Button>
        <JoinFieldInfo info={['로그인 시 사용할 이메일입니다']} />
      </Stack>

      <Collapse in={verifyCodeStatus != 'none'} unmountOnExit>
        <Stack direction="row" spacing={1}>
          <FormInput
            label="인증코드"
            name="verifyCode"
            control={control}
            rules={{ required: { value: true, message: '인증코드를 입력해주세요' } }}
          />
          <Button
            sx={{ flexShrink: 0, width: 120, height: 40 }}
            onClick={checkVerifyCode}
            disabled={verifyCodeStatus === 'verified'}
          >
            {verifyCodeStatus === 'pending' ? '인증코드 확인' : '인증완료'}
          </Button>
        </Stack>
      </Collapse>

      <Collapse in={verifyCodeStatus === 'pending'} unmountOnExit>
        <Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">입력대기시간</Typography>
            <Typography variant="subtitle2" color="primary.main">
              {dayjs.duration(verifyCodeTimer.time, 'seconds').format('mm:ss')}
            </Typography>
          </Stack>
          <Typography variant="caption">인증번호는 받은 시점으로 5분간만 유효합니다.</Typography>
        </Stack>
      </Collapse>
    </Stack>
  )
}
