import { useAssignQuest, useRepeatQuest } from '@/api/hooks'
import { MainView } from '@/components/modal'
import { QuestModalQuestSection } from '@/views/quest/modals/main/assign-quest/quest-modal-quest-section'
import {
  QUEST_MODAL_SIDEBAR_MENU_ID,
  SIDEBAR_MENU,
} from '@/views/quest/modals/main/quest-modal-sidebar'
import { QuestModalSettingSection } from '@/views/quest/modals/main/quest-setting/quest-modal-setting-section'
import { QuestModalRepeatQuestSection } from '@/views/quest/modals/main/repeat-quest/quest-modal-repeat-quest-section'
import { useState } from 'react'

export const QUEST_MODAL_ID = 'QUEST_MODAL'

interface QuestModalProps {
  initMenuId?: QUEST_MODAL_SIDEBAR_MENU_ID
}

export function QuestModal({ initMenuId = 'DAILY_QUEST' }: QuestModalProps) {
  const { daily, weekly, monthly } = useAssignQuest()
  const { repeatQuest } = useRepeatQuest()

  const [selectedMenuId, setSelectedMenuId] = useState<QUEST_MODAL_SIDEBAR_MENU_ID>(initMenuId)

  return (
    <MainView
      title="퀘스트"
      modalId={QUEST_MODAL_ID}
      sidebar={SIDEBAR_MENU}
      selectedMenuId={selectedMenuId}
      onSelected={setSelectedMenuId}
    >
      {selectedMenuId === 'DAILY_QUEST' && (
        <QuestModalQuestSection questType="DAILY" quests={daily} />
      )}
      {selectedMenuId === 'WEEKLY_QUEST' && (
        <QuestModalQuestSection questType="WEEKLY" quests={weekly} />
      )}
      {selectedMenuId === 'MONTHLY_QUEST' && (
        <QuestModalQuestSection questType="MONTHLY" quests={monthly} />
      )}
      {selectedMenuId === 'QUEST_SETTING' && <QuestModalSettingSection />}
      {selectedMenuId === 'DAILY_REPEAT_QUEST' && (
        <QuestModalRepeatQuestSection questType="DAILY_REPEAT" quests={repeatQuest.daily} />
      )}
      {selectedMenuId === 'WEEKLY_REPEAT_QUEST' && (
        <QuestModalRepeatQuestSection questType="WEEKLY_REPEAT" quests={repeatQuest.weekly} />
      )}
      {selectedMenuId === 'MONTHLY_REPEAT_QUEST' && (
        <QuestModalRepeatQuestSection questType="MONTHLY_REPEAT" quests={repeatQuest.monthly} />
      )}
    </MainView>
  )
}
