import { Button, Stack, Typography } from '@mui/material'
import terms from '@/assets/term'
import { TermForm } from '../components'
import { useMemo, useState } from 'react'

interface JoinTermSectionProps {
  onNext?: () => void
}

export function JoinTermSection({ onNext }: JoinTermSectionProps) {
  const [agrees, setAgrees] = useState<boolean[]>(() => terms.map(() => false))

  const isAllAgree = useMemo(() => agrees.every((agree) => agree), [agrees])

  const agreeHandler = (i: number) => {
    setAgrees((prev) => {
      return prev.map((agree, index) => (index === i ? !agree : agree))
    })
  }

  return (
    <Stack spacing={4} p={4} alignItems="center">
      <Typography variant="h4" fontWeight={400} py={4}>
        약관동의
      </Typography>
      {terms.map((term, i) => (
        <TermForm
          key={i}
          title={term.title}
          content={term.content}
          isAgree={agrees[i]}
          onAgree={() => agreeHandler(i)}
        />
      ))}
      <Button size="large" onClick={onNext} disabled={!isAllAgree} fullWidth>
        다음
      </Button>
    </Stack>
  )
}
