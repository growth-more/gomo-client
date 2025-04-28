import { AssignQuest } from '@/entities'
import { QuestListItem } from '@/views/quest/components'
import { Box, Stack, SxProps, Theme } from '@mui/material'

interface QuestListProps {
  sx?: SxProps<Theme>
  quests: AssignQuest[]
  checkHandler: (id: string, checked: boolean) => void
  initHash?: number
  enableMenu?: boolean
  disableDivider?: boolean
}

export function QuestList({
  quests,
  checkHandler,
  sx,
  initHash,
  enableMenu,
  disableDivider,
}: QuestListProps) {
  return (
    <Stack
      divider={
        disableDivider ? undefined : (
          <Box mx={1} borderBottom={1} borderColor={(theme) => theme.palette.border.main} />
        )
      }
      gap={0.5}
      sx={sx}
    >
      {quests.map((quest) => (
        <QuestListItem
          key={quest.id}
          questName={quest.content}
          interestName={quest.subjectName}
          interestPoint={10}
          questType={quest.questType}
          selected={quest.completed}
          onChanged={(checked) => checkHandler(quest.id, checked)}
          initHash={initHash}
          enableMenu={enableMenu}
        />
      ))}
    </Stack>
  )
}
