import { Stack, Typography } from '@mui/material'
import { DetailsForm, Form } from './components'

interface JoinFormPageProps {
  onNext?: () => void
}

export function JoinFormPage({ onNext }: JoinFormPageProps) {
  const submitHandler = (data: Form) => {
    console.log(data)
    onNext?.()
  }

  return (
    <Stack spacing={4} p={4} width={450} alignItems="center">
      <Typography variant="h4" fontWeight={400} py={4}>
        회원정보 입력
      </Typography>
      <DetailsForm onSubmit={submitHandler} />
    </Stack>
  )
}
