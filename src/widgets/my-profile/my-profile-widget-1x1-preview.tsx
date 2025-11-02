import { WidgetBasic } from '@/components/widget'
import { Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'
import { Profile } from '@/entities/profile'

const profile: Profile = {
  id: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
  email: 'gomo@gomo.com',
  handle: '',
  name: 'GOMO',
  motto: 'GOMO와 함꼐 성장하자!',
  availablePoints: 0,
  profileImageUrl: '',
  profileBannerUrl: '',
  subscriptionPlan: '',
  signUpDateTime: new Date(),
  loginProvider: 'EMAIL',
  widgetSnapshot: {
    mediaWidth1: [
      { id: 'MY_PROFILE_WIDGET', width: 1, height: 1, row: 0, column: 0 },
      { id: 'CONFIRMED_QUEST_WIDGET', width: 1, height: 1, row: 1, column: 0 },
      { id: 'UNCONFIRMED_QUEST_WIDGET', width: 1, height: 1, row: 2, column: 0 },
      { id: 'QUEST_HISTORY_WIDGET', width: 1, height: 1, row: 3, column: 0 },
      { id: 'INTEREST_GRAPH_WIDGET', width: 1, height: 1, row: 4, column: 0 },
      { id: 'DAILY_QUEST_WIDGET', width: 1, height: 1, row: 5, column: 0 },
      { id: 'WEEKLY_QUEST_WIDGET', width: 1, height: 1, row: 6, column: 0 },
      { id: 'MONTHLY_QUEST_WIDGET', width: 1, height: 1, row: 7, column: 0 },
    ],
    mediaWidth2: [
      { id: 'MY_PROFILE_WIDGET', width: 1, height: 1, row: 0, column: 0 },
      { id: 'CONFIRMED_QUEST_WIDGET', width: 1, height: 1, row: 0, column: 1 },
      { id: 'UNCONFIRMED_QUEST_WIDGET', width: 2, height: 1, row: 1, column: 0 },
      { id: 'QUEST_HISTORY_WIDGET', width: 1, height: 1, row: 2, column: 0 },
      { id: 'INTEREST_GRAPH_WIDGET', width: 1, height: 1, row: 2, column: 1 },
      { id: 'DAILY_QUEST_WIDGET', width: 2, height: 1, row: 3, column: 0 },
      { id: 'WEEKLY_QUEST_WIDGET', width: 1, height: 1, row: 4, column: 0 },
      { id: 'MONTHLY_QUEST_WIDGET', width: 1, height: 1, row: 4, column: 1 },
    ],
    mediaWidth3: [
      { id: 'MY_PROFILE_WIDGET', width: 1, height: 1, row: 0, column: 0 },
      { id: 'CONFIRMED_QUEST_WIDGET', width: 2, height: 1, row: 0, column: 1 },
      { id: 'UNCONFIRMED_QUEST_WIDGET', width: 2, height: 1, row: 1, column: 0 },
      { id: 'INTEREST_GRAPH_WIDGET', width: 1, height: 1, row: 1, column: 2 },
      { id: 'QUEST_STREAK_WIDGET', width: 3, height: 1, row: 2, column: 0 },
      { id: 'DAILY_QUEST_WIDGET', width: 1, height: 1, row: 3, column: 0 },
      { id: 'MONTHLY_QUEST_WIDGET', width: 1, height: 1, row: 3, column: 2 },
      { id: 'WEEKLY_QUEST_WIDGET', width: 1, height: 1, row: 3, column: 1 },
    ],
  },
}

export function MyProfileWidget1x1Preview() {
  return (
    <WidgetBasic
      width={1}
      disableTitle
      sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <Stack
        spacing={2}
        p={1}
        sx={{ '&:hover': { bgcolor: (theme) => theme.palette.background.main }, cursor: 'pointer' }}
        borderRadius={1}
      >
        <ProfileInfo profile={profile} />
        <Motto motto={profile.motto} />
      </Stack>
      <Divider />
    </WidgetBasic>
  )
}
