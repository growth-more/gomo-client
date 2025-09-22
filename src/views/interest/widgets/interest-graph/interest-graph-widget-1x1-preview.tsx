import { Widget } from '@/components/widget'
import { InterestEmpty } from '@/views/interest/components'
import { Box } from '@mui/material'

export function InterestGraphWidget1x1Preview() {
  return (
    <Widget width={1} title="내 관심사" subtitle={`0개의 관심사 관리 중`}>
      <Box p={1} height={1}>
        <InterestEmpty />
      </Box>
    </Widget>
  )
}
