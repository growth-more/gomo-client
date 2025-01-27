import { Button, Stack } from '@mui/material'
import terms from '@/assets/term'
import { TermForm } from './components'
import { useMemo, useState } from 'react'

interface JoinTermPageProps {
  onNext?: () => void
}

export function JoinTermPage({ onNext }: JoinTermPageProps) {
  const [agrees, setAgrees] = useState<boolean[]>(() => terms.map(() => false))

  const isAllAgree = useMemo(() => agrees.every((agree) => agree), [agrees])

  const agreeHandler = (i: number) => {
    setAgrees((prev) => {
      return prev.map((agree, index) => (index === i ? !agree : agree))
    })
  }

  return (
    <Stack spacing={4} p={4}>
      {terms.map((term, i) => (
        <TermForm
          key={i}
          title={term.title}
          content={term.content}
          isAgree={agrees[i]}
          onAgree={() => agreeHandler(i)}
        />
      ))}
      <Button size="large" onClick={onNext} disabled={!isAllAgree}>
        다음
      </Button>
    </Stack>
  )
}
