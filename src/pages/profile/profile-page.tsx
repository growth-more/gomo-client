import { alpha, Box, Divider, IconButton, Stack, Tooltip } from '@mui/material'
import { useProfile } from '@/api/hooks'
import { Iconify } from '@/components/iconify'
import { ScrollContainer } from '@/components/scrollbar'
import { Editable } from '@/components/editable'
import { useBoolean, useInnerValue } from '@/hooks'
import { useEffect } from 'react'
import { Streak } from '@/pages/profile/components'

export function ProfilePage() {
  const { profile } = useProfile()

  const editable = useBoolean()

  const profileName = useInnerValue(profile?.name)
  const profileHandle = useInnerValue(profile?.handle)
  const profileMotto = useInnerValue(profile?.motto)
  const profileImg = useInnerValue(profile?.profileImageUrl)

  const profilePreviewHandler = (file: File | null) => {
    if (file) {
      console.log(file)
      profileImg.setValue(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (!editable.value) {
      profileImg.reset()
      profileName.reset()
      profileHandle.reset()
      profileMotto.reset()
    }
  }, [editable, profileImg, profileName, profileHandle, profileMotto])

  if (!profile) {
    return null // TODO: 로딩 컴포넌트 추가
  }

  return (
    <Stack height={1}>
      <ScrollContainer sx={{ overflowX: 'hidden' }}>
        <Stack p={1}>
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
            <Editable.Avatar img={profileImg.value} onEdit={profilePreviewHandler} />
            <Stack alignItems="center" spacing={0.5} width={1}>
              <Editable.Text
                fontSize={18}
                fontWeight={600}
                color="text.secondary"
                value={profileName.value}
                onEdit={profileName.setValue}
                inputMaxWidth={200}
              />
              <Editable.Text
                fontSize={12}
                fontWeight={500}
                color="text.secondary"
                value={profileHandle.value}
                onEdit={profileHandle.setValue}
                inputMaxWidth={150}
              />
            </Stack>
            <Stack width={1} alignItems="center" spacing={0.5}>
              <Iconify icon="flowbite:quote-solid" width={15} sx={{ color: 'text.secondary' }} />
              <Editable.Text
                width={1}
                value={profileMotto.value}
                onEdit={profileMotto.setValue}
                fontSize={14}
                fontWeight={500}
                color="text.secondary"
                textAlign="center"
                textOverflow="ellipsis"
                overflow="hidden"
                noWrap
              />
            </Stack>
          </Stack>
        </Stack>

        <Box p={1}>
          <Streak />
        </Box>
      </ScrollContainer>

      <Divider />
      <Stack
        direction="row"
        p={1}
        justifyContent="flex-end"
        alignItems="center"
        bgcolor={(theme) => alpha(theme.palette.background.paper, 0.4)}
        spacing={1}
      >
        {editable.value ? (
          <>
            <Tooltip title="프로필 수정 취소">
              <IconButton size="small" onClick={editable.onFalse}>
                <Iconify icon="material-symbols:close-rounded" />
              </IconButton>
            </Tooltip>
            <Tooltip title="프로필 수정 완료">
              <IconButton size="small" onClick={editable.onFalse}>
                <Iconify icon="mdi:check" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="프로필 수정">
            <IconButton size="small" onClick={editable.onTrue}>
              <Iconify icon="lets-icons:edit" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  )
}
