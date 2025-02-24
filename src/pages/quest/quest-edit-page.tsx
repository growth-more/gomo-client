import { useAssignQuest } from '@/api/hooks'
import { useWindowStore } from '@/stores'
import { alpha, Button, Stack, Tab, Tabs, TextField } from '@mui/material'
import { QUEST_CREATE_PAGE_ID, UPDATE_QUEST_PAGE_ID } from '@/constants/window-view'
import { useQuestTab } from './hooks'
import { useEffect, useState } from 'react'
import { AssignQuest } from '@/entities'

// TODO: react-hook-form 적용
// TODO: 관심사 연결

interface QuestEditPageProps {
  prevData?: AssignQuest
}

export function QuestEditPage({ prevData }: QuestEditPageProps) {
  const { createQuest, updateQuest } = useAssignQuest()
  const { removeView } = useWindowStore()
  const { tab: questType, tabs, tabHandler, setTab } = useQuestTab()

  const [content, setContent] = useState('')

  const buttonText = prevData ? '퀘스트 수정' : '퀘스트 추가'

  const closeHandler = () => {
    removeView(prevData ? UPDATE_QUEST_PAGE_ID(prevData.id) : QUEST_CREATE_PAGE_ID)
  }

  const createHandler = () => {
    if (prevData) {
      return
    }
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

  const updateHandler = () => {
    if (!prevData) {
      return
    }
    updateQuest(
      {
        body: {
          subjectId: '1',
          subjectName: '1',
          questType,
          content,
        },
        id: prevData.id,
      },
      { onSuccess: () => closeHandler() }
    )
  }

  useEffect(() => {
    if (!prevData) {
      return
    }
    setContent(prevData.content)
    setTab(prevData.questType)
  }, [prevData, setTab])

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

        <Button
          variant="contained"
          color="primary"
          onClick={prevData ? updateHandler : createHandler}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  )
}
