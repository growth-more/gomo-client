import DailyQuestWidget from '@/views/quest/widgets/daily-quest'
import UnconfirmedQuestWidget from '@/views/quest/widgets/unconfirmed-quest'
import WeeklyQuestWidget from '@/views/quest/widgets/weekly-quest'
import MonthlyQuestWidget from '@/views/quest/widgets/monthly-quest'
import InterestGraphWidget from '@/views/interest/widgets/interest-graph'
import MyProfileWidget from '@/views/profile/widgets/my-profile'
import QuestHistoryWidget from '@/views/history/widgets/quest-history'
import QuestStreakWidget from '@/views/history/widgets/quest-streak'
import ConfirmedQuestWidget from '@/views/quest/widgets/confirmed-quest'

import { Box, useMediaQuery } from '@mui/material'

export function WidgetManager() {
  const x3 = useMediaQuery('(min-width: 1210px)')
  const x2 = useMediaQuery('(min-width: 820px)')

  if (x3) {
    return (
      <Box display="flex" gap="40px" flexWrap="wrap" width="1130px">
        <MyProfileWidget.components.S1x1 />
        <ConfirmedQuestWidget.components.S1x2 />

        <UnconfirmedQuestWidget.components.S1x2 />
        <InterestGraphWidget.components.S1x1 />

        <QuestStreakWidget.components.S1x3 />

        <DailyQuestWidget.components.S1x1 />
        <WeeklyQuestWidget.components.S1x1 />
        <MonthlyQuestWidget.components.S1x1 />
      </Box>
    )
  }

  if (x2) {
    return (
      <Box display="flex" gap="40px" flexWrap="wrap" width="740px">
        <MyProfileWidget.components.S1x1 />
        <ConfirmedQuestWidget.components.S1x1 />

        <UnconfirmedQuestWidget.components.S1x2 />

        <QuestHistoryWidget.components.S1x1 />
        <InterestGraphWidget.components.S1x1 />

        <DailyQuestWidget.components.S1x2 />
        <WeeklyQuestWidget.components.S1x1 />
        <MonthlyQuestWidget.components.S1x1 />
      </Box>
    )
  }

  return (
    <Box display="flex" gap="40px" flexWrap="wrap" width="350px">
      <MyProfileWidget.components.S1x1 />
      <ConfirmedQuestWidget.components.S1x1 />
      <UnconfirmedQuestWidget.components.S1x1 />
      <QuestHistoryWidget.components.S1x1 />
      <InterestGraphWidget.components.S1x1 />
      <DailyQuestWidget.components.S1x1 />
      <WeeklyQuestWidget.components.S1x1 />
      <MonthlyQuestWidget.components.S1x1 />
    </Box>
  )
}
