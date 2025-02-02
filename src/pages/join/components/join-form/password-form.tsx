import { FormInput } from '@/components/form'
import { Stack } from '@mui/material'
import { Control, UseFormWatch } from 'react-hook-form'
import { Form } from '@/pages/join/join-form-page'
import { JoinFieldInfo } from './join-field-info'

interface PasswordFormProps {
  control: Control<Form>
  watch: UseFormWatch<Form>
}

export function PasswordForm({ control, watch }: PasswordFormProps) {
  return (
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
        <JoinFieldInfo info={['로그인 시 사용할 비밀번호입니다']} />
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
  )
}
