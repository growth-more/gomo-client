import { Widget } from '@/components/widget'
import { QuestStreakWidget1x3 } from '@/views/history/widgets/quest-streak/quest-streak-widget-1x3'
import { QuestStreakWidget1x3Preview } from '@/views/history/widgets/quest-streak/quest-streak-widget-1x3-preview'

export const questStreakWidget: Widget = {
  id: 'QUEST_STREAK_WIDGET',
  name: '퀘스트 연속기록',
  sizes: [
    {
      width: 3,
      height: 1,
      component: QuestStreakWidget1x3,
      preview: QuestStreakWidget1x3Preview,
    },
  ],
  render: (width: number, height: number) => {
    if (width === 3 && height === 1) {
      return <QuestStreakWidget1x3 />
    }
    return null
  },
}
