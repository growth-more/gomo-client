import { useProfile } from '@/api/hooks'
import {
  WIDGET_COLUMN_SPACING,
  WIDGET_HEIGHT,
  WIDGET_ROW_SPACING,
  WIDGET_WIDTH,
} from '@/components/widget/constant'
import { calculateWidgetHeight, calculateWidgetWidth, getWidget } from '@/components/widget/utils'

import { Box } from '@mui/material'
import _ from 'lodash'
import { useMemo } from 'react'

interface WidgetManagerProps {
  mediaWidth: number
}

export function WidgetManager({ mediaWidth }: WidgetManagerProps) {
  const {
    profile: { widgetSnapshot: snapshot },
  } = useProfile()

  const widgetData = useMemo(() => {
    if (mediaWidth === 1) {
      return snapshot.mediaWidth1
    }
    if (mediaWidth === 2) {
      return snapshot.mediaWidth2
    }
    return snapshot.mediaWidth3
  }, [snapshot, mediaWidth])

  const mediaHeight = useMemo(() => {
    return (
      _(widgetData)
        .map((widget) => widget.row + widget.height)
        .max() ?? 0
    )
  }, [widgetData])

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${mediaWidth}, ${WIDGET_WIDTH}px)`}
      gridTemplateRows={`repeat(${mediaHeight}, ${WIDGET_HEIGHT}px)`}
      rowGap={`${WIDGET_ROW_SPACING}px`}
      columnGap={`${WIDGET_COLUMN_SPACING}px`}
    >
      {widgetData.map((widget) => (
        <Box
          key={widget.id}
          gridRow={widget.row + 1}
          gridColumn={widget.column + 1}
          width={calculateWidgetWidth(widget.width)}
          height={calculateWidgetHeight(widget.height)}
        >
          {getWidget(widget.id, widget.width, widget.height)}
        </Box>
      ))}
    </Box>
  )
}
