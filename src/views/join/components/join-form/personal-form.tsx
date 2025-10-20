import { FormInput } from '@/components/form'
import { Button, InputAdornment, Stack } from '@mui/material'
import { Control, UseFormWatch } from 'react-hook-form'
import { Form } from '@/views/join/sections'
import { JoinFieldInfo } from './join-field-info'
import { useBoolean } from '@/hooks'
import { useEffect, useState } from 'react'
import { useJoin } from '@/api/hooks'

interface PersonalFormProps {
  control: Control<Form>
  watch: UseFormWatch<Form>
  onVerified?: () => void
  onUnverified?: () => void
}

export function PersonalForm({ control, watch, onVerified, onUnverified }: PersonalFormProps) {
  const { checkHandleDuplicate } = useJoin()

  const [verifiedHandle, setVerifiedHandle] = useState<string | null>(null)
  const verifiedDuplicate = useBoolean()
  const handle = watch('handle')

  const checkDuplicate = () => {
    checkHandleDuplicate(handle, {
      onSuccess: () => {
        verifiedDuplicate.onTrue()
        setVerifiedHandle(handle)
        onVerified?.()
      },
      onError: () => {
        verifiedDuplicate.onFalse()
        setVerifiedHandle(null)
        onUnverified?.()
      },
    })
  }

  useEffect(() => {
    if (verifiedDuplicate.value && verifiedHandle !== handle) {
      setVerifiedHandle(null)
      onUnverified?.()
      verifiedDuplicate.onFalse()
    }
  }, [handle, verifiedDuplicate, verifiedHandle, onUnverified])

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
        <Button
          sx={{ flexShrink: 0, height: 40 }}
          disabled={!handle || verifiedDuplicate.value}
          onClick={checkDuplicate}
        >
          {verifiedDuplicate.value ? '중복확인완료' : '중복확인'}
        </Button>
        <JoinFieldInfo
          info={[
            '핸들은 본인을 구분할 수 있는 고유식별자입니다',
            '자신을 잘 드러낼 수 있는 키워드를 사용하세요',
          ]}
        />
      </Stack>

      <Stack position="relative">
        <FormInput
          label="슬로건"
          name="motto"
          control={control}
          rules={{
            required: { value: true, message: '슬로건을 입력해주세요' },
            maxLength: { value: 30, message: '슬로건은 30자 이하여야 합니다' },
          }}
        />
        <JoinFieldInfo
          info={[
            '슬로건은 본인을 표현하는 짧은 글 한 줄입니다',
            '평소 생각하던 좌우명, 다짐 등 나만의 슬로건을 작성해보세요.',
          ]}
        />
      </Stack>
    </Stack>
  )
}
