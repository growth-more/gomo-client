import { InvisibleInput } from '@/components/editable/text'
import { alpha, Box, Button, Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { SelectInterestIcon } from './select-interest-icon'
import { useInterest } from '@/api/hooks'

export function CreateInterest() {
  const { createInterest } = useInterest()

  const [interestName, setInterestName] = useState('')
  const [interestLogo, setInterestLogo] = useState<File | null>(null)

  const isDisabled = useMemo(() => {
    return interestName.trim() === '' || !interestLogo
  }, [interestName, interestLogo])

  const createHandler = () => {
    if (!interestLogo) {
      return
    }
    createInterest({
      body: {
        logo: interestLogo,
        name: interestName,
      },
    })
  }

  return (
    <Stack
      width={1}
      p={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
      borderRadius={1}
      spacing={1}
    >
      <Stack direction="row" spacing={1}>
        <SelectInterestIcon file={interestLogo} onChange={setInterestLogo} />
        <Box
          bgcolor={(theme) => theme.palette.grey[800]}
          py={0.5}
          px={1}
          flex={1}
          borderRadius={1}
          color="white"
        >
          <InvisibleInput
            placeholder="관심사 이름을 입력해주세요"
            sx={{ color: 'white' }}
            value={interestName}
            onChange={(e) => setInterestName(e.target.value)}
          />
        </Box>
      </Stack>
      <Button size="small" fullWidth onClick={createHandler} disabled={isDisabled}>
        새 관심사 생성
      </Button>
    </Stack>
  )
}
