import { useInterest, useRepeatQuest } from '@/api/hooks'
import { useWindowStore } from '@/stores'
import { alpha, Button, Stack, Tab, Tabs, TextField } from '@mui/material'
import { useQuestTab } from './hooks'
import { useEffect, useState } from 'react'
import { SelectInterest } from '@/pages/interest/components'
import { Interest } from '@/entities/interest'
import { REPEAT_QUEST_CREATE_PAGE_ID, REPEAT_QUEST_UPDATE_PAGE_ID } from '@/constants/window-view'
import { RepeatQuest } from '@/entities/quest'

interface RepeatQuestEditPageProps {
  prevData?: RepeatQuest
}

export function RepeatQuestEditPage({ prevData }: RepeatQuestEditPageProps) {
  const { createQuest, updateQuest } = useRepeatQuest()
  const { interests } = useInterest()

  const { removeView } = useWindowStore()
  const { tab: questType, tabs, tabHandler, setTab } = useQuestTab()

  const [content, setContent] = useState('')
  const [interest, setInterest] = useState<Interest | null>(null)

  const buttonText = prevData ? '반복 퀘스트 수정' : '반복 퀘스트 추가'

  const closeHandler = () => {
    removeView(prevData ? REPEAT_QUEST_UPDATE_PAGE_ID(prevData.id) : REPEAT_QUEST_CREATE_PAGE_ID)
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

    const interest = interests.find((interest) => interest.id === prevData.subjectId)
    if (interest) {
      setInterest(interest)
    }
  }, [prevData, setTab, interests])

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
