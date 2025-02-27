import { ScrollContainer } from '@/components/scrollbar'
import { alpha, Box, Button, Divider, Stack } from '@mui/material'
import _ from 'lodash'
import { motion } from 'motion/react'

const START_YEAR = 2020

interface DateSelectorProps {
  year: number
  month: number
  onChange: (year: number, month: number) => void
}

export function DateSelector({ year, month, onChange }: DateSelectorProps) {
  const END_YEAR = new Date().getFullYear()

  return (
    <Stack
      direction="row"
      height={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.1)}
      borderRadius={1}
      border={1}
      borderColor="divider"
    >
      <ScrollContainer>
        <Box
          component={motion.div}
          p={0.4}
          width={1}
          height={36}
          position="absolute"
          sx={{ pointerEvents: 'none' }}
          animate={{ y: (END_YEAR - year) * 36 }}
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
        <Stack position="relative">
          {_.range(END_YEAR, START_YEAR - 1, -1).map((y, i) => (
            <Button
              key={i}
              variant="text"
              sx={{
                color: year === y ? 'white' : 'text.secondary',
                fontSize: 14,
                fontWeight: 500,
                transition: 'color 0.4s ease-in-out',
              }}
              onClick={() => onChange(y, month)}
            >
              {y}년
            </Button>
          ))}
        </Stack>
      </ScrollContainer>

      <Divider orientation="vertical" />

      <ScrollContainer>
        <Stack position="relative">
          <Box
            component={motion.div}
            p={0.4}
            width={1}
            height={36}
            position="absolute"
            sx={{ pointerEvents: 'none' }}
            animate={{ y: month * 36 }}
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
          {_.range(12).map((m, i) => (
            <Button
              key={i}
              variant="text"
              sx={{
                color: month === m ? 'white' : 'text.secondary',
                fontSize: 14,
                fontWeight: 500,
                transition: 'color 0.4s ease-in-out',
              }}
              onClick={() => onChange(year, m)}
            >
              {m + 1}월
            </Button>
          ))}
        </Stack>
      </ScrollContainer>
    </Stack>
  )
}
