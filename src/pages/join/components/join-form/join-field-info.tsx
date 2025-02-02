import { useMemo } from 'react'
import { Info } from '../info'
import { Stack, Typography } from '@mui/material'

interface JoinFieldInfoProps {
  info: string[]
}

export function JoinFieldInfo({ info }: JoinFieldInfoProps) {
  const content = useMemo(() => {
    return (
      <Stack>
        {info.map((e, i) => (
          <Typography variant="caption" fontSize={11} key={i}>
            {e}
          </Typography>
        ))}
      </Stack>
    )
  }, [info])

  return (
    <Info
      info={content}
      sx={{
        height: 40,
        color: 'text.disabled',
        position: 'absolute',
        right: 0,
        transform: 'translateX(calc(100% + 10px))',
      }}
    />
  )
}
