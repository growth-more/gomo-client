import { Box, Stack, Typography } from '@mui/material'
import { Avatar } from '@/pages/profile/components'
import { useProfile } from '@/api/hooks'
import { EditableText } from '@/components/input'
import { Iconify } from '@/components/iconify'
import { ScrollContainer } from '@/components/scrollbar'

export function ProfilePage() {
  const { profile } = useProfile()

  if (!profile) {
    return null
  }

  return (
    <Stack p={1} height={1}>
      <ScrollContainer sx={{ overflowX: 'hidden' }}>
        <Box
          width={1}
          sx={{ aspectRatio: 2.5 }}
          border={1}
          borderColor="divider"
          borderRadius={2}
          component="img"
          src="./img/profile-bg.jpg"
        />
        <Stack alignItems="center" spacing={1} sx={{ translate: '0 -35px' }}>
          <Avatar img={profile.profileImageUrl} />
          <Stack alignItems="center" spacing={0.5}>
            <EditableText
              fontSize={18}
              fontWeight={600}
              color="text.secondary"
              text={profile.name}
              tooltip="이름 수정"
            />
            <EditableText
              fontSize={12}
              fontWeight={500}
              color="text.secondary"
              text={profile.handle}
              tooltip="핸들 수정"
            />
          </Stack>
          <Stack width={1} alignItems="center" spacing={0.5}>
            <Iconify
              icon="flowbite:quote-solid"
              width={15}
              sx={{
                color: 'text.secondary',
              }}
            />
            <Typography
              width={1}
              fontSize={14}
              fontWeight={500}
              color="text.secondary"
              textAlign="center"
              textOverflow="ellipsis"
              overflow="hidden"
              noWrap
            >
              {profile.motto}
            </Typography>
          </Stack>
        </Stack>

        {/* <Stack width={1} flex={1} bgcolor="divider" borderRadius={2}></Stack> */}
      </ScrollContainer>
    </Stack>
  )
}
