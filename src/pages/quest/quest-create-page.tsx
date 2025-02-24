import { useAssignQuest } from '@/api/hooks'
import { useWindowStore } from '@/stores'
import { alpha, Button, Stack, Tab, Tabs, TextField } from '@mui/material'
import { QUEST_CREATE_PAGE_ID } from '@/constants/window-view'
import { useQuestTab } from './hooks'
import { useState } from 'react'

// TODO: react-hook-form 적용
// TODO: 관심사 연결

export function QuestCreatePage() {
  const { createQuest } = useAssignQuest()
  const { removeView } = useWindowStore()
  const { tab: questType, tabs, tabHandler } = useQuestTab()

  const [content, setContent] = useState('')

  const closeHandler = () => {
    removeView(QUEST_CREATE_PAGE_ID)
  }

  const submitHandler = () => {
    createQuest(
      {
        body: {
          subjectId: '1',
          subjectName: '1',
          questType,
          content,
        },
      },
      { onSuccess: () => closeHandler() }
    )
  }

  return (
    <Stack height={1}>
      <Tabs
        value={questType}
        onChange={tabHandler}
        variant="fullWidth"
        sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0.4) }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      <Stack p={1} pt={2} flex={1} justifyContent="space-between">
        <TextField
          label="퀘스트 내용"
          size="small"
          fullWidth
          variant="filled"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={submitHandler}>
          퀘스트 추가
        </Button>
      </Stack>
    </Stack>
  )
}
