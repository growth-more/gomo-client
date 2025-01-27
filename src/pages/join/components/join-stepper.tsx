import { Step, StepLabel, Stepper } from '@mui/material'

const STEPS = [
  {
    label: '약관동의',
  },
  {
    label: '회원정보입력',
  },
  {
    label: '가입완료',
  },
  {
    label: '초기설정',
  },
]

interface JoinStepperProps {
  step: number
}

export function JoinStepper({ step }: JoinStepperProps) {
  return (
    <Stepper sx={{ width: 1 }} activeStep={step} alternativeLabel>
      {STEPS.map((step, i) => (
        <Step key={i}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
