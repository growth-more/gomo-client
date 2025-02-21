import { alpha, Divider, Stack, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'] as const
type Tab = (typeof tabs)[number]

export function QuestPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('DAILY')

  const tabHandler = (e: SyntheticEvent, tab: Tab) => {
    setSelectedTab(tab)
  }

  return (
    <Stack width={1} height={1}>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={tabHandler}
        sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0.2) }}
      >
        <Tab label="일일" value="DAILY" />
        <Tab label="주간" value="WEEKLY" />
        <Tab label="월간" value="MONTHLY" />
      </Tabs>
      <Divider />
      <Stack flex={1} p={2}></Stack>
    </Stack>
  )
}
