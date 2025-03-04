import { CalendarHeatmap } from '@/components/heatmap'
import { StreakSelector } from '@/pages/profile/components/streak-selector'
import { alpha, Divider, Stack } from '@mui/material'
import { useState } from 'react'

export function StreakSection() {
  const [endDate, setEndDate] = useState(new Date())

  return (
    <Stack p={2}>
      <Stack
        direction="row"
        bgcolor={(theme) => alpha(theme.palette.background.paper, 0.7)}
        borderRadius={2}
        overflow="hidden"
        height={150}
      >
        <CalendarHeatmap
          data={[]}
          endDate={endDate}
          sx={{ flex: 1, overflow: 'hidden', p: 1, alignSelf: 'center' }}
        />
        <Divider orientation="vertical" />
        <StreakSelector value={endDate} onChange={setEndDate} sx={{ width: 80, p: 0.5 }} />
      </Stack>
    </Stack>
  )
}
