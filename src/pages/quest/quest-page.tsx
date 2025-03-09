import { useAssignQuest, useRepeatQuest } from '@/api/hooks'
import { alpha, Button, Divider, IconButton, Stack, Tab, Tabs, Tooltip } from '@mui/material'
import { ScrollContainer } from '@/components/scrollbar'
import { InvisibleContainer } from '@/components/container'
import { Iconify } from '@/components/iconify'
import { useWindowStore } from '@/stores'
import { QuestSection, RepeatQuestSection } from '@/pages/quest/components'
import { useQuestTabWithRepeat } from '@/pages/quest/hooks'
import {
  QUEST_CREATE_PAGE_ID,
  QUEST_CREATE_PAGE_VIEW,
  QUEST_SETTING_PAGE_ID,
  QUEST_SETTING_PAGE_VIEW,
} from '@/constants/window-view'

export function QuestPage() {
  const { daily, weekly, monthly } = useAssignQuest()
  const { repeatQuest } = useRepeatQuest()

  const { tabs, tab, tabHandler } = useQuestTabWithRepeat()
  const { addViewWithId } = useWindowStore()

  const questSettingPageHandler = () => {
    addViewWithId(QUEST_SETTING_PAGE_ID, QUEST_SETTING_PAGE_VIEW)
  }

  const questCreatePageHandler = () => {
    addViewWithId(QUEST_CREATE_PAGE_ID, QUEST_CREATE_PAGE_VIEW)
  }

  return (
    <Stack width={1} height={1} overflow="hidden">
      <Tabs
        variant="fullWidth"
        value={tab}
        onChange={tabHandler}
        sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0.4) }}
      >
        {tabs.map((tab, i) => (
          <Tab key={i} label={tab.label} value={tab.value} sx={{ minWidth: 50 }} />
        ))}
      </Tabs>

      <Divider />
      <Stack flex={1} spacing={2} sx={{ overflowY: 'auto' }}>
        <ScrollContainer sx={{ p: 1 }}>
          <InvisibleContainer visible={tab === 'DAILY'}>
            <QuestSection quest={daily} />
          </InvisibleContainer>

          <InvisibleContainer visible={tab === 'WEEKLY'}>
            <QuestSection quest={weekly} />
          </InvisibleContainer>

          <InvisibleContainer visible={tab === 'MONTHLY'}>
            <QuestSection quest={monthly} />
          </InvisibleContainer>

          <InvisibleContainer visible={tab === 'REPEAT'}>
            <RepeatQuestSection quest={repeatQuest} />
          </InvisibleContainer>
        </ScrollContainer>
      </Stack>

      <Divider />
      <Stack
        direction="row"
        p={1}
        justifyContent="flex-end"
        alignItems="center"
        bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
        spacing={1}
      >
        <Button fullWidth onClick={questCreatePageHandler}>
          퀘스트 만들기
        </Button>
        <Tooltip title="퀘스트 설정">
          <IconButton size="small" onClick={questSettingPageHandler}>
            <Iconify icon="solar:settings-bold" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
