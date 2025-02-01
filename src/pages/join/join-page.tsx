import { Container, Stack } from '@mui/material'
import { JoinStepper } from './components'
import { useState } from 'react'
import { JoinTermPage } from './join-term-page'
import { InvisibleContainer } from '@/components/container'
import { JoinFormPage } from './join-form-page'
import { JoinSuccessPage } from './join-success-page'

export function JoinPage() {
  const [step, setStep] = useState(0)

  return (
    <Container
      sx={{ p: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}
      maxWidth="md"
    >
      <JoinStepper step={step} />

      <Stack alignItems="center" width={1} flex={1}>
        <InvisibleContainer visible={step === 0}>
          <JoinTermPage onNext={() => setStep(1)} />
        </InvisibleContainer>
        <InvisibleContainer visible={step === 1}>
          <JoinFormPage onNext={() => setStep(2)} />
        </InvisibleContainer>
        <InvisibleContainer visible={step === 2} sx={{ width: 1, height: 1 }}>
          <JoinSuccessPage />
        </InvisibleContainer>
      </Stack>
    </Container>
  )
}
