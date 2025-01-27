import { Box, Container } from '@mui/material'
import { JoinStepper } from './components'
import { useState } from 'react'
import { JoinTermPage } from './join-term-page'
import { InvisibleContainer } from '@/components/container'

export function JoinPage() {
  const [step, setStep] = useState(0)

  return (
    <Container sx={{ p: 4 }} maxWidth="md">
      <JoinStepper step={step} />

      <Box>
        <InvisibleContainer visible={step === 0}>
          <JoinTermPage onNext={() => setStep(1)} />
        </InvisibleContainer>
      </Box>
    </Container>
  )
}
