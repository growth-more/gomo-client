import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { EmailVerifyForm, PasswordForm, PersonalForm } from '../components'
import { useBoolean } from '@/hooks'
import { useJoin } from '@/api/hooks'

export interface Form {
  email: string
  verifyCode: string
  password: string
  passwordConfirm: string
  name: string
  handle: string
  motto: string
}

interface JoinFormSectionProps {
  onNext?: (email: string, password: string) => void
}

export function JoinFormSection({ onNext }: JoinFormSectionProps) {
  const { join } = useJoin()

  const emailVerified = useBoolean()
  const handleVerified = useBoolean()

  const { control, handleSubmit, watch } = useForm<Form>({
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

  const submitHandler = handleSubmit((form) => {
    join(
      {
        email: form.email,
        name: form.name,
        password: form.password,
        handle: `@${form.handle}`,
        motto: form.motto,
      },
      { onSuccess: () => onNext?.(form.email, form.password) }
    )
  })

  return (
    <Stack spacing={4} p={4} width={450} alignItems="center">
      <Typography variant="h4" fontWeight={400} py={4}>
        회원정보 입력
      </Typography>

      <form onSubmit={submitHandler} noValidate style={{ width: '100%' }}>
        <Stack spacing={4}>
          <EmailVerifyForm
            control={control}
            watch={watch}
            onVerified={emailVerified.onTrue}
            onUnverified={emailVerified.onFalse}
          />
          <PasswordForm control={control} watch={watch} />
          <PersonalForm
            control={control}
            watch={watch}
            onVerified={handleVerified.onTrue}
            onUnverified={handleVerified.onFalse}
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            disabled={!emailVerified.value || !handleVerified.value}
          >
            다음
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
