import { Interest } from '@/entities/interest'
import { alpha, Button, Stack, Typography } from '@mui/material'
import { ScoreBar } from './score-bar'
import { SelectInterest } from '@/pages/interest/components/select-interest'
import { useInnerValue } from '@/hooks'
import { Editable } from '@/components/editable'
import { OnEditHandler } from '@/components/editable/types'

interface InterestIndicatorProps {
  interest: Interest | null
  upperInterest: Interest | null
  onDelete?: () => void
  onChangeUpperInterest?: (id: string | null) => void
  onChangeInterestName?: (name: string, handler?: OnEditHandler) => void
}

export function InterestIndicator({
  interest,
  upperInterest,
  onDelete,
  onChangeUpperInterest,
  onChangeInterestName,
}: InterestIndicatorProps) {
  const { value, setValue, isChanged } = useInnerValue<Interest | null>(upperInterest)

  const changeUpperInterestHandler = () => {
    if (value === null) {
      onChangeUpperInterest?.(null)
      return
    }
    onChangeUpperInterest?.(value.id)
  }

  return (
    <Stack
      width={1}
      height={1}
      p={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.2)}
      borderRadius={1}
      spacing={1}
      color={(theme) => theme.palette.common.white}
    >
      {interest && (
        <>
          <Stack flex={1} spacing={1} py={1}>
            <Stack
              pl={0.5}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
            >
              <Editable.Text
                value={interest.name}
                onEdit={onChangeInterestName}
                fontSize={16}
                fontWeight={600}
                inputSx={{
                  color: 'white',
                  textAlign: 'left',
                }}
                iconSx={{
                  color: 'white',
                }}
                noWrap
              />
              <Typography
                fontSize={12}
                fontWeight={400}
                flexShrink={0}
                px={1}
                py={0.5}
                bgcolor={(theme) => theme.palette.grey[900]}
                borderRadius={1}
                noWrap
              >
                LV {interest.level}
              </Typography>
            </Stack>
            <ScoreBar score={interest.score} scoreThreshold={interest.scoreThreshold} />

            <Stack spacing={1} pt={2}>
              <Typography fontSize={14} fontWeight={600} pl={0.5}>
                상위 관심사
              </Typography>
              <SelectInterest value={value} onSelect={setValue} placeholder="상위 관심사 없음" />
              <Button
                size="small"
                disabled={!isChanged}
                fullWidth
                onClick={changeUpperInterestHandler}
              >
                상위 관심사 수정하기
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button size="small" fullWidth color="error" onClick={onDelete}>
              삭제
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
