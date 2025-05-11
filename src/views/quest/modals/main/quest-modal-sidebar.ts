import { MainViewSidebarMenuGroup } from '@/components/modal/main-view/main-view-sidebar'

export type QUEST_MODAL_SIDEBAR_MENU_ID =
  | 'DAILY_QUEST'
  | 'WEEKLY_QUEST'
  | 'MONTHLY_QUEST'
  | 'DAILY_REPEAT_QUEST'
  | 'WEEKLY_REPEAT_QUEST'
  | 'MONTHLY_REPEAT_QUEST'
  | 'QUEST_SETTING'

export const SIDEBAR_MENU: MainViewSidebarMenuGroup<QUEST_MODAL_SIDEBAR_MENU_ID>[] = [
  {
    title: '퀘스트',
    menu: [
      {
        id: 'DAILY_QUEST',
        label: '일일 퀘스트',
      },
      {
        id: 'WEEKLY_QUEST',
        label: '주간 퀘스트',
      },
      {
        id: 'MONTHLY_QUEST',
        label: '월간 퀘스트',
      },
    ],
  },
  {
    title: '반복 퀘스트',
    menu: [
      {
        id: 'DAILY_REPEAT_QUEST',
        label: '일일 반복퀘스트',
      },
      {
        id: 'WEEKLY_REPEAT_QUEST',
        label: '주간 반복퀘스트',
      },
      {
        id: 'MONTHLY_REPEAT_QUEST',
        label: '월간 반복퀘스트',
      },
    ],
  },
  {
    title: '퀘스트 설정',
    menu: [
      {
        id: 'QUEST_SETTING',
        label: '퀘스트 설정',
      },
    ],
  },
]
