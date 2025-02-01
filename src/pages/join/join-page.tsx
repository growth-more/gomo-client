import { Container, Stack } from '@mui/material'
import { JoinStepper } from './components'
import { useState } from 'react'
import { JoinTermPage } from './join-term-page'
import { InvisibleContainer } from '@/components/container'
import { JoinFormPage } from './join-form-page'

export function JoinPage() {
  const [step, setStep] = useState(0)

  return (
    <Container sx={{ p: 4 }} maxWidth="md">
      <JoinStepper step={step} />

      <Stack alignItems="center">
        <InvisibleContainer visible={step === 0}>
          <JoinTermPage onNext={() => setStep(1)} />
        </InvisibleContainer>
        <InvisibleContainer visible={step === 1}>
          <JoinFormPage onNext={() => setStep(2)} />
        </InvisibleContainer>
      </Stack>
    </Container>
  )
}
