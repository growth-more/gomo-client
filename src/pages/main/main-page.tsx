import { Box, Stack, SxProps, Theme } from '@mui/material'
import { OnlyAuth } from '@/auth/guard'
import DailyQuestWidget from '@/views/quest/widgets/daily-quest'
import UnconfirmedQuestWidget from '@/views/quest/widgets/unconfirmed-quest'
import WeeklyQuestWidget from '@/views/quest/widgets/weekly-quest'
import MonthlyQuestWidget from '@/views/quest/widgets/monthly-quest'
import InterestGraphWidget from '@/views/interest/widgets/interest-graph'

const backgroundSx: SxProps<Theme> = {
  backgroundImage: 'url("/img/bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export function MainPage() {
  return (
    <OnlyAuth>
      <Box width={1} height="100vh" position="fixed" sx={backgroundSx} zIndex={-1} />
      <Stack width={1} alignItems="center" px={4} py={15}>
        <Box display="flex" gap="40px" flexWrap="wrap">
          <InterestGraphWidget.S1x1 />
          <DailyQuestWidget.S1x1 />
          <DailyQuestWidget.S1x2 />
          <UnconfirmedQuestWidget.S1x1 />
          <UnconfirmedQuestWidget.S1x2 />
          <WeeklyQuestWidget.S1x1 />
          <WeeklyQuestWidget.S1x2 />
          <MonthlyQuestWidget.S1x1 />
          <MonthlyQuestWidget.S1x2 />
        </Box>
      </Stack>
    </OnlyAuth>
  )
}
