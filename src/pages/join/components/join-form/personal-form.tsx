import { FormInput } from '@/components/form'
import { Button, InputAdornment, Stack } from '@mui/material'
import { Control, UseFormWatch } from 'react-hook-form'
import { Form } from '@/pages/join/join-form-page'
import { JoinFieldInfo } from './join-field-info'
import { useBoolean } from '@/hooks'

interface PersonalFormProps {
  control: Control<Form>
  watch: UseFormWatch<Form>
}

export function PersonalForm({ control, watch }: PersonalFormProps) {
  const handleDuplicate = useBoolean()

  const handle = watch('handle')

  return (
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
        <JoinFieldInfo
          info={[
            'GOMO에서 사용할 이름입니다',
            '실제 이름과 상관없이 불리고 싶은 이름으로 지어주세요',
          ]}
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
        <JoinFieldInfo
          info={[
            '핸들은 본인을 구분할 수 있는 고유식별자입니다',
            '자신을 잘 드러낼 수 있는 키워드를 사용하세요',
          ]}
        />
      </Stack>
    </Stack>
  )
}
