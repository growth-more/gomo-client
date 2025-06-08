import { Button } from '@/components/button'
import { Profile } from '@/entities/profile'
import { Avatar, Banner, UpdateField } from '@/views/profile/components'
import { Divider, Stack } from '@mui/material'
import { useState } from 'react'

interface MyProfileUpdateSectionProps {
  profile: Profile
  onBack?: () => void
}

export function MyProfileUpdateSection({ profile, onBack }: MyProfileUpdateSectionProps) {
  const [name, setName] = useState(profile.name)
  const [handle, setHandle] = useState(profile.handle)
  const [motto, setMotto] = useState(profile.motto)

  return (
    <Stack>
      <Banner src={profile.profileImageUrl} editMode />
      <Divider />

      <Stack direction="row" p={2} justifyContent="space-between" alignItems="center" spacing={2}>
        <Avatar src={profile.profileImageUrl} />
        <Button.Primary label="프로필 사진 변경" size="large" sx={{ px: 2 }} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack p={2} spacing={3}>
        <UpdateField label="이름" origin={profile.name} value={name} onChange={setName} />
        {/* 나중에 핸들에 @값 없애면 isHandle 사용 */}
        <UpdateField label="핸들" origin={profile.handle} value={handle} onChange={setHandle} />
        <UpdateField label="모토" origin={profile.motto} value={motto} onChange={setMotto} />
      </Stack>
      <Divider />
      <Stack p={1} spacing={1}>
        <Button.Plain label="돌아가기" size="large" onClick={onBack} />
      </Stack>
    </Stack>
  )
}
