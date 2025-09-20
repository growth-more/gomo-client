import { QuestHistoryWidget, QuestStreakWidget } from '@/views/history/widgets'
import { InterestGraphWidget } from '@/views/interest/widgets'
import { MyProfileWidget } from '@/views/profile/widgets'
import {
  ConfirmedQuestWidget,
  DailyQuestWidget,
  MonthlyQuestWidget,
  UnconfirmedQuestWidget,
  WeeklyQuestWidget,
} from '@/views/quest/widgets'

import { Box } from '@mui/material'

interface WidgetManagerProps {
  mediaWidth: number
}

export function WidgetManager({ mediaWidth }: WidgetManagerProps) {
  if (mediaWidth === 3) {
    return (
      <Box display="flex" gap="40px" flexWrap="wrap" width="1130px">
        <MyProfileWidget.widgets.S1x1.component />
        <ConfirmedQuestWidget.widgets.S1x2.component />

        <UnconfirmedQuestWidget.widgets.S1x2.component />
        <InterestGraphWidget.widgets.S1x1.component />

        <QuestStreakWidget.widgets.S1x3.component />

        <DailyQuestWidget.widgets.S1x1.component />
        <WeeklyQuestWidget.widgets.S1x1.component />
        <MonthlyQuestWidget.widgets.S1x1.component />
      </Box>
    )
  }

  if (mediaWidth === 2) {
    return (
      <Box display="flex" gap="40px" flexWrap="wrap" width="740px">
        <MyProfileWidget.widgets.S1x1.component />
        <ConfirmedQuestWidget.widgets.S1x1.component />

        <UnconfirmedQuestWidget.widgets.S1x2.component />

        <QuestHistoryWidget.widgets.S1x1.component />
        <InterestGraphWidget.widgets.S1x1.component />

        <DailyQuestWidget.widgets.S1x2.component />
        <WeeklyQuestWidget.widgets.S1x1.component />
        <MonthlyQuestWidget.widgets.S1x1.component />
      </Box>
    )
  }

  return (
    <Box display="flex" gap="40px" flexWrap="wrap" width="350px">
      <MyProfileWidget.widgets.S1x1.component />
      <ConfirmedQuestWidget.widgets.S1x1.component />
      <UnconfirmedQuestWidget.widgets.S1x1.component />
      <QuestHistoryWidget.widgets.S1x1.component />
      <InterestGraphWidget.widgets.S1x1.component />
      <DailyQuestWidget.widgets.S1x1.component />
      <WeeklyQuestWidget.widgets.S1x1.component />
      <MonthlyQuestWidget.widgets.S1x1.component />
    </Box>
  )
}
