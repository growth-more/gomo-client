import { AssignQuest } from '@/entities'
import { QuestItem } from '@/views/quest/components'
import { Box, Stack, SxProps, Theme } from '@mui/material'

interface QuestListProps {
  sx?: SxProps<Theme>
  quests: AssignQuest[]
  checkHandler: (id: string, checked: boolean) => void
  initHash?: number
}

export function QuestList({ quests, checkHandler, sx, initHash }: QuestListProps) {
  return (
    <Stack
      p={1}
      divider={<Box mx={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />}
      gap={0.5}
      sx={sx}
    >
      {quests.map((quest) => (
        <QuestItem
          key={quest.id}
          questName={quest.content}
          interestName={quest.subjectName}
          interestPoint={10}
          questType={quest.questType}
          selected={quest.completed}
          onChanged={(checked) => checkHandler(quest.id, checked)}
          initHash={initHash}
        />
      ))}
    </Stack>
  )
}
