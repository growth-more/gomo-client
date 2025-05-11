import { useInterest } from '@/api/hooks'
import { ScrollContainer } from '@/components/scrollbar'
import { Interest } from '@/entities/interest'
import { SelectInterestItem } from '@/views/interest/components/select-interest/select-interest-item'
import { Box, Stack, SxProps, Theme } from '@mui/material'

interface SelectInterestProps {
  selected?: Interest | null
  onChanged?: (interest: Interest) => void
  sx?: SxProps<Theme>
  enableNoneOption?: boolean
  noneOptionLabel?: string
  onNoneOption?: () => void
  disableInterestIds?: string[]
}

export function SelectInterest({
  selected,
  onChanged,
  sx,
  enableNoneOption,
  noneOptionLabel,
  onNoneOption,
  disableInterestIds,
}: SelectInterestProps) {
  const { interests } = useInterest()

  return (
    <Box
      border={1}
      borderRadius={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => theme.palette.background.main}
      overflow="hidden"
      sx={sx}
    >
      <ScrollContainer sx={{ height: 1 }}>
        <Stack p={1} spacing={0.5}>
          {enableNoneOption && (
            <SelectInterestItem
              name={noneOptionLabel ?? '선택 안함'}
              selected={selected === null}
              onClick={onNoneOption}
            />
          )}
          {interests.map((interest) => (
            <SelectInterestItem
              key={interest.id}
              name={interest.name}
              selected={selected?.id === interest.id}
              onClick={() => onChanged?.(interest)}
              disable={disableInterestIds?.includes(interest.id)}
            />
          ))}
        </Stack>
      </ScrollContainer>
    </Box>
  )
}
