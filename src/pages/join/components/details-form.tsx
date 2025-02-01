import { FormInput } from '@/components/form'
import { useBoolean, useTimer } from '@/hooks'
import { Button, Collapse, InputAdornment, Stack, SxProps, Theme, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Info } from './info'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const VERIFY_CODE_TIME = 300

const infoSx: SxProps<Theme> = {
  height: 40,
  color: 'text.disabled',
  position: 'absolute',
  right: 0,
  transform: 'translateX(calc(100% + 10px))',
}

interface DetailsFormProps {
  onSubmit?: (form: Form) => void
  autoReset?: boolean
}

export interface Form {
  email: string
  verifyCode: string
  password: string
  passwordConfirm: string
  name: string
  handle: string
}

type VerifyCodeStatus = 'none' | 'pending' | 'verified'

export function DetailsForm({ onSubmit, autoReset = true }: DetailsFormProps) {
  const handleDuplicate = useBoolean()
  const verifyCodeTimer = useTimer(VERIFY_CODE_TIME)

  const [verifyCodeStatus, setVerifyCodeStatus] = useState<VerifyCodeStatus>('none')

  const { control, handleSubmit, reset, watch } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      verifyCode: '',
      password: '',
      passwordConfirm: '',
      name: '',
      handle: '',
    },
  })

  const email = watch('email')
  const handle = watch('handle')

  const submitHandler = handleSubmit((form) => {
    if (!onSubmit) {
      return
    }
    onSubmit(form)
    if (autoReset) {
      reset()
    }
  })

  const requestVerifyCode = () => {
    setVerifyCodeStatus('pending')
    verifyCodeTimer.restart()
  }

  return (
    <form onSubmit={submitHandler} noValidate style={{ width: '100%' }}>
      <Stack spacing={4}>
        {/* Email */}
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
              {verifyCodeStatus === 'pending' ? '인증코드 재전송' : '인증코드 전송'}
            </Button>
            <Info
              info={
                <Typography variant="caption" sx={{ fontSize: 11 }}>
                  로그인 시 사용할 이메일입니다
                </Typography>
              }
              sx={infoSx}
            />
          </Stack>

          <Collapse in={verifyCodeStatus != 'none'} unmountOnExit>
            <Stack direction="row" spacing={1}>
              <FormInput
                label="인증코드"
                name="verifyCode"
                control={control}
                rules={{ required: { value: true, message: '인증코드를 입력해주세요' } }}
              />
              <Button sx={{ flexShrink: 0, width: 120, height: 40 }}>인증코드 확인</Button>
            </Stack>
          </Collapse>

          <Collapse in={verifyCodeStatus !== 'none'} unmountOnExit>
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2">입력대기시간</Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {dayjs.duration(verifyCodeTimer.time, 'seconds').format('mm:ss')}
                </Typography>
              </Stack>
              <Typography variant="caption">
                인증번호는 받은 시점으로 5분간만 유효합니다.
              </Typography>
            </Stack>
          </Collapse>
        </Stack>

        {/* Password */}
        <Stack spacing={1.5}>
          <Stack position="relative">
            <FormInput
              label="비밀번호"
              name="password"
              inputMode="text"
              type="password"
              control={control}
              rules={{
                required: { value: true, message: '비밀번호를 입력해주세요' },
                minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다' },
                maxLength: { value: 15, message: '비밀번호는 15자 이하여야 합니다' },
              }}
            />
            <Info
              info={
                <Typography variant="caption" sx={{ fontSize: 11 }}>
                  로그인 시 사용할 비밀번호입니다
                </Typography>
              }
              sx={infoSx}
            />
          </Stack>
          <FormInput
            label="비밀번호 확인"
            name="passwordConfirm"
            inputMode="text"
            type="password"
            control={control}
            rules={{
              required: { value: true, message: '비밀번호를 입력해주세요' },
              validate: {
                passwordMatch: (value) => {
                  const password = watch('password')
                  if (password !== value) {
                    return '비밀번호가 일치하지 않습니다'
                  }
                  return true
                },
              },
            }}
          />
        </Stack>

        {/* Personal */}
        <Stack spacing={1.5}>
          <Stack position="relative">
            <FormInput
              label="이름"
              name="name"
              control={control}
              rules={{
                required: { value: true, message: '이름을 입력해주세요' },
                minLength: { value: 1, message: '이름은 1자 이상이어야 합니다' },
                maxLength: { value: 30, message: '이름은 30자 이하여야 합니다' },
              }}
            />
            <Info
              info={
                <Stack>
                  <Typography variant="caption" fontSize={11}>
                    GOMO에서 사용할 이름입니다
                  </Typography>
                  <Typography variant="caption" fontSize={11}>
                    실제 이름과 상관없이 불리고 싶은 이름으로 지어주세요
                  </Typography>
                </Stack>
              }
              sx={infoSx}
            />
          </Stack>

          <Stack direction="row" spacing={1} position="relative">
            <FormInput
              label="핸들"
              name="handle"
              control={control}
              rules={{
                required: { value: true, message: '핸들을 입력해주세요' },
                minLength: { value: 3, message: '핸들은 3자 이상이어야 합니다' },
                maxLength: { value: 30, message: '핸들은 30자 이하여야 합니다' },
              }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                },
              }}
            />
            <Button sx={{ flexShrink: 0, height: 40 }} disabled={!handle}>
              중복확인
            </Button>
            <Info
              info={
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: 11 }}>
                    핸들은 본인을 구분할 수 있는 고유식별자입니다
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: 11 }}>
                    자신을 잘 드러낼 수 있는 키워드를 사용하세요
                  </Typography>
                </Stack>
              }
              sx={infoSx}
            />
          </Stack>
        </Stack>
        <Button size="large" type="submit" fullWidth>
          다음
        </Button>
      </Stack>
    </form>
  )
}
