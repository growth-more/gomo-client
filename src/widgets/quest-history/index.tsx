import { Widget } from '@/components/widget'
import { QuestHistoryWidget1x1 } from '@/views/history/widgets/quest-history/quest-history-widget-1x1'
import { QuestHistoryWidget1x1Preview } from '@/views/history/widgets/quest-history/quest-history-widget-1x1-preview'
import { QuestHistoryWidget } from '@/widgets/quest-history/quest-history-widget'

export const questHistoryWidget: Widget = {
  id: 'QUEST_HISTORY_WIDGET',
  name: '퀘스트 기록',
  sizes: [
    {
      width: 1,
      height: 1,
      component: QuestHistoryWidget1x1,
      preview: QuestHistoryWidget1x1Preview,
    },
  ],
  render: (width: number, height: number) => <QuestHistoryWidget width={width} height={height} />,
}
