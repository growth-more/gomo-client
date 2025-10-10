import { Widget } from '@/components/widget'
import { UnconfirmedQuestWidget1x1 } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x1'
import { UnconfirmedQuestWidget1x1Preview } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x1-preview'
import { UnconfirmedQuestWidget1x2 } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x2'
import { UnconfirmedQuestWidget1x2Preview } from '@/views/quest/widgets/unconfirmed-quest/unconfirmed-quest-widget-1x2-preview'

export const unconfirmedQuestWidget: Widget = {
  id: 'UNCONFIRMED_QUEST_WIDGET',
  name: '대기중인 퀘스트',
  sizes: [
    {
      width: 1,
      height: 1,
      component: UnconfirmedQuestWidget1x1,
      preview: UnconfirmedQuestWidget1x1Preview,
    },
    {
      width: 2,
      height: 1,
      component: UnconfirmedQuestWidget1x2,
      preview: UnconfirmedQuestWidget1x2Preview,
    },
  ],
  render: (width: number, height: number) => {
    if (width === 1 && height === 1) {
      return <UnconfirmedQuestWidget1x1 />
    }
    if (width === 2 && height === 1) {
      return <UnconfirmedQuestWidget1x2 />
    }
    return null
  },
}
