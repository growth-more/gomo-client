import { Box, IconButton, Stack, Typography } from '@mui/material'

import { useMemo, useState } from 'react'
import { ScrollContainer } from '@/components/scrollbar'
import { Button } from '@/components/button'
import { WidgetCustomItem } from '@/components/widget/widget-custom/widget-custom-item'
import { Iconify } from '@/components/iconify'
import { widgetCategory } from '@/widgets'
import { Widget } from '@/components/widget/widget.types'

interface WidgetCustomToolboxProps {
  collapsed: boolean
  toggleCollapsed: () => void
}

export function WidgetCustomToolbox({ collapsed, toggleCollapsed }: WidgetCustomToolboxProps) {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0)

  const selectedWidgets = useMemo(() => {
    return widgetCategory[selectedCategoryIdx].widgets
  }, [selectedCategoryIdx])

  return (
    <Stack
      width={1}
      position="fixed"
      left={0}
      right={0}
      bottom={-370}
      p={2}
      zIndex={1}
      alignItems="center"
    >
      <Stack
        width={1}
        maxWidth={1100}
        height={400}
        alignItems="center"
        sx={{
          transform: collapsed ? 'translateY(0px)' : 'translateY(-370px)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Box
          border={1}
          borderBottom={0}
          borderRadius={2}
          borderColor={(theme) => theme.palette.border.main}
          bgcolor={(theme) => theme.palette.background.main}
          sx={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          overflow="hidden"
        >
          <IconButton onClick={toggleCollapsed} sx={{ width: 1, borderRadius: 0, px: 10, py: 0.5 }}>
            <Iconify icon={collapsed ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </Box>
        <Stack
          borderRadius={1}
          width={1}
          height={1}
          border={1}
          borderColor={(theme) => theme.palette.border.main}
          bgcolor={(theme) => theme.palette.background.main}
          overflow="hidden"
          divider={
            <Box width={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
          }
        >
          <Stack direction="row" overflow="hidden" flex={1}>
            <WidgetCustomToolboxCategory
              selectedIdx={selectedCategoryIdx}
              onSelected={setSelectedCategoryIdx}
            />
            <WidgetCustomToolboxWidgets widgets={selectedWidgets} />
          </Stack>
          <Stack p={1} justifyContent="flex-end" spacing={1} direction="row">
            <Button.Plain label="취소" />
            <Button.Primary label="완료" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

interface WidgetCustomToolboxCategoryProps {
  selectedIdx: number
  onSelected: (idx: number) => void
}

function WidgetCustomToolboxCategory({
  selectedIdx,
  onSelected,
}: WidgetCustomToolboxCategoryProps) {
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
        {widgetCategory.map((category, i) => (
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
              {category.name}
            </Typography>
          </IconButton>
        ))}
      </Stack>
    </ScrollContainer>
  )
}

interface WidgetCustomToolboxWidgetsProps {
  widgets: Widget[]
}

function WidgetCustomToolboxWidgets({ widgets }: WidgetCustomToolboxWidgetsProps) {
  return (
    <ScrollContainer sx={{ p: 1 }}>
      <Stack flexWrap="wrap" gap={3} direction="row">
        {widgets.map((widget, i) =>
          widget.sizes.map((size, j) => (
            <Stack spacing={0.5} key={`${i}.${j}`}>
              <WidgetCustomItem widgetId={widget.id} width={size.width} height={size.height}>
                <size.preview />
              </WidgetCustomItem>
              <Typography fontSize={13} fontWeight={400} textAlign="center">
                {widget.name}
              </Typography>
            </Stack>
          ))
        )}
      </Stack>
    </ScrollContainer>
  )
}
