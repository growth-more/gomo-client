import { ScrollContainer } from '@/components/scrollbar'
import { alpha, Box, Button, Stack } from '@mui/material'
import { motion } from 'motion/react'
import { useMemo } from 'react'

const SELECTOR_HEIGHT = 36

interface VerticalSelectorOption<T> {
  label: string
  value: T
}

interface VerticalSelectorProps<T> {
  options: VerticalSelectorOption<T>[]
  value: T
  onChange?: (value: T) => void
}

export function VerticalSelector<T>({ options, value, onChange }: VerticalSelectorProps<T>) {
  const selectedIdx = useMemo(() => {
    const idx = options.findIndex((option) => option.value === value)
    return idx
  }, [options, value])

  return (
    <ScrollContainer sx={{ position: 'relative' }}>
      <Box
        component={motion.div}
        p={0.4}
        width={1}
        height={SELECTOR_HEIGHT}
        position="absolute"
        sx={{ pointerEvents: 'none' }}
        animate={{ y: selectedIdx * SELECTOR_HEIGHT }}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.4,
        }}
      >
        <Box
          width={1}
          height={1}
          bgcolor={(theme) => alpha(theme.palette.common.black, 0.4)}
          borderRadius={1}
        />
      </Box>
      <Stack>
        {options.map((option, i) => (
          <Button
            key={i}
            variant="text"
            sx={{
              color: option.value === value ? 'white' : 'text.secondary',
              fontSize: 14,
              fontWeight: 500,
              transition: 'color 0.4s ease-in-out',
            }}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </ScrollContainer>
  )
}
