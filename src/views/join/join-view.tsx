import { Container, Stack, GlobalStyles } from '@mui/material'
import { useRef, useState } from 'react'
import { JoinStepper } from './components'
import { InvisibleContainer } from '@/components/container'
import { OnlyGuest } from '@/auth/guard'
import { useAuth } from '@/auth/hooks'
import { Navigate } from 'react-router-dom'
import { paths } from '@/routes'
import { JoinFormSection, JoinSuccessSection, JoinTermSection } from '@/views/join/sections'

export function JoinView() {
  const { login } = useAuth()

  const [step, setStep] = useState(0)
  const loginRef = useRef<{ email: string; password: string }>()

  const formStepHandler = (email: string, password: string) => {
    loginRef.current = { email, password }
    setStep(2)
  }

  const skipHandler = () => {
    if (!loginRef.current) {
      return
    }
    login(loginRef.current, { onSuccess: () => <Navigate to={paths.root} /> })
  }

  const surveyHandler = () => {
    if (!loginRef.current) {
      return
    }
    login(loginRef.current, { onSuccess: () => <Navigate to={paths.root} /> })
  }

  return (
    <OnlyGuest>
      <GlobalStyles styles={{ body: { overflow: 'initial' } }} />
      <Container
        sx={{ p: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}
        maxWidth="md"
      >
        <JoinStepper step={step} />

        <Stack alignItems="center" width={1} flex={1}>
          <InvisibleContainer visible={step === 0}>
            <JoinTermSection onNext={() => setStep(1)} />
          </InvisibleContainer>
          <InvisibleContainer visible={step === 1}>
            <JoinFormSection onNext={formStepHandler} />
          </InvisibleContainer>
          <InvisibleContainer visible={step === 2} sx={{ width: 1, height: 1 }}>
            <JoinSuccessSection onSkip={skipHandler} onSurvey={surveyHandler} />
          </InvisibleContainer>
        </Stack>
      </Container>
    </OnlyGuest>
  )
}
