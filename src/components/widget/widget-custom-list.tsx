import { Box, IconButton, Stack, Typography } from '@mui/material'

import { QuestHistoryWidget, QuestStreakWidget } from '@/views/history/widgets'
import { InterestGraphWidget } from '@/views/interest/widgets'
import { MyProfileWidget } from '@/views/profile/widgets'
import {
  ConfirmedQuestWidget,
  UnconfirmedQuestWidget,
  WeeklyQuestWidget,
  MonthlyQuestWidget,
  DailyQuestWidget,
} from '@/views/quest/widgets'
import { useMemo, useState } from 'react'
import { ScrollContainer } from '@/components/scrollbar'
import { Button } from '@/components/button'
import { WidgetData } from '@/components/widget/type'
import { colord } from 'colord'

const WIDGETS = [
  QuestHistoryWidget,
  QuestStreakWidget,
  InterestGraphWidget,
  MyProfileWidget,
  ConfirmedQuestWidget,
  UnconfirmedQuestWidget,
  WeeklyQuestWidget,
  MonthlyQuestWidget,
  DailyQuestWidget,
] as const

export function WidgetCustomList() {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0)

  return (
    <Stack
      width={1}
      height={400}
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      p={2}
      zIndex={1}
      alignItems="center"
    >
      <Stack
        borderRadius={1}
        width={1}
        maxWidth={1100}
        border={1}
        borderColor={(theme) => theme.palette.border.main}
        bgcolor={(theme) => theme.palette.background.main}
        overflow="hidden"
        divider={
          <Box width={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
        }
      >
        <Stack direction="row" overflow="hidden" flex={1}>
          <WidgetCustomListCategory
            selectedIdx={selectedCategoryIdx}
            onSelected={setSelectedCategoryIdx}
          />
          <WidgetCustomListWidgets selectedIdx={selectedCategoryIdx} />
        </Stack>
        <Stack p={1} justifyContent="flex-end" spacing={1} direction="row">
          <Button.Plain label="취소" />
          <Button.Primary label="완료" />
        </Stack>
      </Stack>
    </Stack>
  )
}

interface WidgetCustomListCategoryProps {
  selectedIdx: number
  onSelected: (idx: number) => void
}

function WidgetCustomListCategory({ selectedIdx, onSelected }: WidgetCustomListCategoryProps) {
  return (
    <ScrollContainer
      sx={{
        width: 200,
        p: 1,
        borderRight: 1,
        borderColor: (theme) => theme.palette.border.main,
        flexGrow: 0,
      }}
    >
      <Stack spacing={0.5}>
        {WIDGETS.map((widget, i) => (
          <IconButton
            key={i}
            onClick={() => onSelected(i)}
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: selectedIdx === i ? 'primary.main' : undefined,
              '&:hover': {
                bgcolor: selectedIdx === i ? 'primary.main' : undefined,
              },
            }}
          >
            <Typography
              fontSize={13}
              fontWeight={400}
              textAlign="left"
              width={1}
              sx={{
                color: (theme) =>
                  selectedIdx === i ? theme.palette.common.white : theme.palette.text.primary,
              }}
            >
              {widget.name}
            </Typography>
          </IconButton>
        ))}
      </Stack>
    </ScrollContainer>
  )
}

interface WidgetCustomListWidgetsProps {
  selectedIdx: number
}

function WidgetCustomListWidgets({ selectedIdx }: WidgetCustomListWidgetsProps) {
  const widgets = useMemo(() => {
    const result: WidgetData['widgets'][keyof WidgetData['widgets']][] = []
    for (const widget of Object.values(WIDGETS[selectedIdx].widgets)) {
      result.push(widget)
    }
    return result
  }, [selectedIdx])

  return (
    <ScrollContainer sx={{ p: 1 }}>
      <Stack flexWrap="wrap" gap={1} direction="row">
        {widgets.map((widget, i) => (
          <WidgetPreviewItem key={i} width={widget.width} height={widget.height} />
        ))}
      </Stack>
    </ScrollContainer>
  )
}

const PREVIEW_WIDTH = 200
const PREVIEW_HEIGHT = 200

interface WidgetPreviewItemProps {
  width: number
  height: number
}

function WidgetPreviewItem({ width, height }: WidgetPreviewItemProps) {
  return (
    <Box
      borderRadius={1}
      width={PREVIEW_WIDTH * width}
      height={PREVIEW_HEIGHT * height}
      border={1}
      borderColor={(theme) => theme.palette.border.main}
      bgcolor={(theme) => colord(theme.palette.background.dark).alpha(0.5).toHex()}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: (theme) => colord(theme.palette.background.dark).alpha(0.8).toHex(),
        },
      }}
    ></Box>
  )
}
