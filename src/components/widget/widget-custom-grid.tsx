import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { Box } from '@mui/material'
import { colord } from 'colord'
import { useState } from 'react'

interface WidgetCustomGridProps {
  mediaWidth: number
}

export function WidgetCustomGrid({ mediaWidth }: WidgetCustomGridProps) {
  const [height, setHeight] = useState(5)

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
      gridTemplateRows={`repeat(${height}, ${WIDGET_HEIGHT}px)`}
      rowGap={`${WIDGET_ROW_SPACING}px`}
      columnGap={`${WIDGET_COLUMN_SPACING}px`}
      mb="400px"
    >
      {Array.from({ length: mediaWidth * height }).map((_, index) => (
        <WidgetCustomGridItem key={index} />
      ))}
    </Box>
  )
}

function WidgetCustomGridItem() {
  return <Box bgcolor={colord('#1C252E').alpha(0.5).toHex()}></Box>
}
