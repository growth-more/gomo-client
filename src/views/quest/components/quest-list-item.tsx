import { Checkbox } from '@/components/checkbox'
import { IconButton } from '@/components/icon-button'
import { Iconify } from '@/components/iconify'
import { QUEST_TYPE_LABEL } from '@/constants'
import { QuestType } from '@/entities'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface QuestListItemProps {
  questName: string
  questType: QuestType
  interestName: string
  interestPoint: number
  selected: boolean
  initHash?: number
  onChanged?: (checked: boolean) => void
  onDisabled?: () => void
  enableMenu?: boolean
}

export function QuestListItem({
  questName,
  questType,
  interestName,
  interestPoint,
  selected,
  onChanged,
  onDisabled,
  initHash,
  enableMenu,
}: QuestListItemProps) {
  const [hash, setHash] = useState(initHash)
  const [checked, setChecked] = useState(selected)

  const checkHandler = (checked: boolean) => {
    setChecked(checked)
    onChanged?.(checked)
  }

  useEffect(() => {
    if (hash === initHash) {
      setChecked(selected)
      return
    }
    setHash(initHash)
  }, [initHash, hash, selected])

  useEffect(() => {
    setChecked(selected)
  }, [selected])

  return (
    <Stack
      p={1}
      direction="row"
      justifyContent="space-between"
      borderRadius={1}
      sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
    >
      <Stack overflow="hidden">
        <Stack direction="row" alignItems="center" gap={1}>
          <Checkbox
            checked={checked}
            onChanged={checkHandler}
            disableUncheck={selected}
            onDisabled={onDisabled}
          />
          <Typography fontSize={15} fontWeight={500} noWrap>
            {questName}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box width={30} />
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">{QUEST_TYPE_LABEL[questType]}퀘스트</Typography>
            <Iconify icon="mdi:dot" sx={{ width: 15 }} width={15} />
            <Typography variant="caption">{interestName}</Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ ml: 0.5, color: (theme) => theme.palette.primary.main }}
            >
              +{interestPoint}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {enableMenu && <IconButton.Menu />}
    </Stack>
  )
}
