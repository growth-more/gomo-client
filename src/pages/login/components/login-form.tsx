import { FormInput } from '@/components/form/form-input'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormOptions } from './form-options'

const LOGO_SIZE = 50

interface LoginFormProps {
  onSubmit?: (form: Form) => void
  autoReset?: boolean
}

export interface Form {
  email: string
  password: string
}

export function LoginForm({ onSubmit, autoReset = true }: LoginFormProps) {
  const { control, handleSubmit, reset } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitHandler = handleSubmit((form) => {
    if (!onSubmit) {
      return
    }
    onSubmit(form)
    if (autoReset) {
      reset()
    }
  })

  return (
    <form onSubmit={submitHandler} noValidate>
      <Stack spacing={1} alignItems="center">
        <Stack p={2} justifyContent="center" alignItems="center">
          <Box component="img" src="/img/logo.png" width={LOGO_SIZE} height={LOGO_SIZE} />
        </Stack>

        <Stack width={1} spacing={1.5} alignItems="center">
          <FormInput
            label="이메일"
            type="email"
            inputMode="email"
            name="email"
            control={control}
            rules={{ required: true }}
          />
          <FormInput
            label="비밀번호"
            type="password"
            inputMode="text"
            name="password"
            control={control}
            rules={{ required: true }}
          />
        </Stack>

        <FormOptions />

        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>
      </Stack>
    </form>
  )
}
