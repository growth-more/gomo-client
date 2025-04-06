import { Interest } from '@/entities/interest'
import { alpha, Button, Stack, Typography } from '@mui/material'
import { SelectInterest } from '@/pages/interest/components/select-interest'
import { useInnerValue } from '@/hooks'
import { Editable } from '@/components/editable'
import { OnEditHandler } from '@/components/editable/types'
import { MajorIcon } from '@/pages/interest/components/major-icon'
import { useMajorInterest } from '@/api/hooks'
import { InterestLevelLabel, InterestScoreBar } from '@/components/interest'

interface InterestIndicatorProps {
  interest: Interest | null
  upperInterest: Interest | null
  isMajor: boolean
  onDelete?: () => void
  onChangeUpperInterest?: (id: string | null) => void
  onChangeInterestName?: (name: string, handler?: OnEditHandler) => void
}

export function InterestIndicator({
  interest,
  upperInterest,
  isMajor,
  onDelete,
  onChangeUpperInterest,
  onChangeInterestName,
}: InterestIndicatorProps) {
  const { createMajorInterest, deleteMajorInterest, majorInterest } = useMajorInterest()

  const { value, setValue, isChanged } = useInnerValue<Interest | null>(upperInterest)

  const registMajorHandler = () => {
    if (interest === null) {
      return
    }
    createMajorInterest({ id: interest.id })
  }

  const unregistMajorHandler = () => {
    if (interest === null) {
      return
    }
    const major = majorInterest.find((major) => major.name === interest.name) ?? null
    if (major === null) {
      return
    }
    deleteMajorInterest(major.id)
  }

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
              <InterestLevelLabel level={interest.level} />
            </Stack>
            <InterestScoreBar score={interest.score} scoreThreshold={interest.scoreThreshold} />

            <Stack direction="row" justifyContent="flex-end">
              <MajorIcon
                isMajor={isMajor}
                onRegist={registMajorHandler}
                onUnregist={unregistMajorHandler}
              />
            </Stack>

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
