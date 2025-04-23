import { Step } from '@/components/stepper/step'
import { Stack } from '@mui/material'

interface StepperProps {
  step: number
  steps: string[]
  navigable?: boolean
  onNavigate?: (step: number) => void
}

export function Stepper({ step, steps, navigable, onNavigate }: StepperProps) {
  return (
    <Stack
      direction="row"
      p={1}
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
    >
      {steps.map((label, i) => (
        <Step
          key={i}
          label={label}
          completed={i <= step}
          clickable={navigable && i < step}
          onClick={() => onNavigate?.(i)}
        />
      ))}
    </Stack>
  )
}
