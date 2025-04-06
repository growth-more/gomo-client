import { useAssignQuest, useInterest } from '@/api/hooks'
import { useWindowStore } from '@/stores'
import { alpha, Button, Stack, Tab, Tabs, TextField } from '@mui/material'
import { QUEST_CREATE_PAGE_ID, UPDATE_QUEST_PAGE_ID } from '@/constants/window-view'
import { useQuestTab } from './hooks'
import { useEffect, useState } from 'react'
import { AssignQuest } from '@/entities'
import { SelectInterest } from '@/pages/interest/components'
import { Interest } from '@/entities/interest'

interface QuestEditPageProps {
  prevData?: AssignQuest
}

export function QuestEditPage({ prevData }: QuestEditPageProps) {
  const { createQuest, updateQuest } = useAssignQuest()
  const { interestList } = useInterest()

  const { removeView } = useWindowStore()
  const { tab: questType, tabs, tabHandler, setTab } = useQuestTab()

  const [content, setContent] = useState('')
  const [interest, setInterest] = useState<Interest | null>(null)

  const buttonText = prevData ? '퀘스트 수정' : '퀘스트 추가'

  const closeHandler = () => {
    removeView(prevData ? UPDATE_QUEST_PAGE_ID(prevData.id) : QUEST_CREATE_PAGE_ID)
  }

  const createHandler = () => {
    if (prevData || !interest) {
      return
    }
    createQuest(
      {
        subjectId: interest.id,
        subjectName: interest.name,
        questType,
        content,
      },
      { onSuccess: () => closeHandler() }
    )
  }

  const updateHandler = () => {
    if (!prevData || !interest) {
      return
    }
    updateQuest(
      prevData.id,
      {
        subjectId: interest.id,
        subjectName: interest.name,
        questType,
        content,
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

    const interest = interestList.find((interest) => interest.id === prevData.subjectId)
    if (interest) {
      setInterest(interest)
    }
  }, [prevData, setTab, interestList])

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
        <SelectInterest value={interest} onSelect={setInterest} placeholder="관심사 선택" />

        <Button
          variant="contained"
          color="primary"
          disabled={!interest || content.trim() === ''}
          onClick={prevData ? updateHandler : createHandler}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  )
}
