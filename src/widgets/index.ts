import { WidgetCategory } from '@/components/widget/widget.types'
import { confirmedQuestWidget } from '@/widgets/confirmed-quest'
import { dailyQuestWidget } from '@/widgets/daily-quest'
import { interestGraphWidget } from '@/widgets/interest-graph'
import { monthlyQuestWidget } from '@/widgets/monthly-quest'
import { myProfileWidget } from '@/widgets/my-profile'
import { questHistoryWidget } from '@/widgets/quest-history'
import { questStreakWidget } from '@/widgets/quest-streak'
import { unconfirmedQuestWidget } from '@/widgets/unconfirmed-quest'
import { weeklyQuestWidget } from '@/widgets/weekly-quest'

export const widgetCategory: WidgetCategory[] = [
  {
    name: '프로필',
    widgets: [myProfileWidget],
  },
  {
    name: '퀘스트',
    widgets: [
      confirmedQuestWidget,
      unconfirmedQuestWidget,
      weeklyQuestWidget,
      monthlyQuestWidget,
      dailyQuestWidget,
    ],
  },
  {
    name: '관심사',
    widgets: [interestGraphWidget],
  },
  {
    name: '퀘스트 기록',
    widgets: [questHistoryWidget, questStreakWidget],
  },
]

export const widgetList = widgetCategory.flatMap((category) => category.widgets)
