import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { EmailVerifyForm, PasswordForm, PersonalForm } from '../components'
import { useBoolean } from '@/hooks'
import { useJoin } from '@/api/hooks'
import { LoginProvider } from '@/entities/profile'
import { useEffect, useState } from 'react'

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
  oauth?: {
    email: string
    name: string
    loginProvider: LoginProvider
  }
}

export function JoinFormSection({ onNext, oauth }: JoinFormSectionProps) {
  const { join } = useJoin()

  const emailVerified = useBoolean()
  const handleVerified = useBoolean()

  const [temporaryToken, setTemporaryToken] = useState<string | null>(null)

  const { control, handleSubmit, watch, reset, unregister } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      email: oauth?.email ?? '',
      verifyCode: '',
      password: '',
      passwordConfirm: '',
      name: oauth?.name ?? '',
      handle: '',
    },
  })

  const emailVerifiedHandler = (temporaryToken: string) => {
    setTemporaryToken(temporaryToken)
    emailVerified.onTrue()
  }

  useEffect(() => {
    if (!oauth) {
      return
    }
    unregister('password')
    unregister('passwordConfirm')
    emailVerified.onTrue()
    reset(
      {
        email: oauth.email,
        name: oauth.name,
      },
      {
        keepDirtyValues: true,
      }
    )
  }, [oauth, reset, emailVerified, unregister])

  const submitHandler = handleSubmit((form) => {
    if (!temporaryToken && !oauth) {
      return
    }
    join(
      {
        email: form.email,
        name: form.name,
        password: form.password,
        handle: `@${form.handle}`,
        motto: form.motto,
        loginProvider: oauth?.loginProvider ?? 'EMAIL',
        temporaryToken: temporaryToken ?? '',
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
            onVerified={emailVerifiedHandler}
            onUnverified={emailVerified.onFalse}
            disabled={!!oauth}
          />
          <PasswordForm control={control} watch={watch} disabled={!!oauth} />
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
