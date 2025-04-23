import { useInterest } from '@/api/hooks'
import { ScrollContainer } from '@/components/scrollbar'
import { Interest } from '@/entities/interest'
import { SelectInterestItem } from '@/views/interest/components/select-interest-item'
import { Box, Stack } from '@mui/material'

interface SelectInterestProps {
  selected?: Interest | null
  onChanged?: (interest: Interest) => void
}

export function SelectInterest({ selected, onChanged }: SelectInterestProps) {
  const { interestList } = useInterest()

  return (
    <Box
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      overflow="hidden"
    >
      <ScrollContainer sx={{ height: 1 }}>
        <Stack p={1} spacing={0.5}>
          {interestList.map((interest) => (
            <SelectInterestItem
              key={interest.id}
              name={interest.name}
              selected={selected?.id === interest.id}
              onClick={() => onChanged?.(interest)}
            />
          ))}
        </Stack>
      </ScrollContainer>
    </Box>
  )
}
