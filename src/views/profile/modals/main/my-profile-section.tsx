import { Button } from '@/components/button'
import { useContextMenu } from '@/components/context-menu'
import { Profile } from '@/entities/profile'
import { Banner, Motto, ProfileInfo } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'

interface MyProfileSectionProps {
  profile: Profile
}

export function MyProfileSection({ profile }: MyProfileSectionProps) {
  const onContextMenu = useContextMenu([
    [
      {
        label: '이름 변경',
      },
      {
        label: '핸들 변경',
      },
      {
        label: '모토 변경',
      },
    ],
    [
      {
        label: '프로필 이미지 변경',
      },
      {
        label: '배너 이미지 변경',
      },
    ],
  ])

  return (
    <Stack>
      <Banner src={profile.profileImageUrl} />
      <Divider />
      <Stack p={2} spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <ProfileInfo profile={profile} />
          <Button.Plain label="프로필 수정" size="large" sx={{ px: 2 }} onClick={onContextMenu} />
        </Stack>
        <Stack
          p={5}
          border={1}
          borderRadius={2}
          borderColor={(theme) => theme.palette.border.light}
          bgcolor={(theme) => theme.palette.background.light}
        >
          <Motto motto={profile.motto} />
        </Stack>
      </Stack>
    </Stack>
  )
}
