import { Step } from '@/components/stepper/step'
import { Stack } from '@mui/material'

interface StepperProps {
  step: number
  steps: string[]
}

export function Stepper({ step, steps }: StepperProps) {
  return (
    <Stack
      direction="row"
      p={1}
      spacing={1.5}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
    >
      {steps.map((label, i) => (
        <Step key={i} label={label} completed={i <= step} />
      ))}
    </Stack>
  )
}
