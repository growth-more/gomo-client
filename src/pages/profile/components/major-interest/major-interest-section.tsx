import { useMajorInterest } from '@/api/hooks'
import { ScrollContainer } from '@/components/scrollbar'
import { MajorInterest } from '@/entities/interest'
import { MajorInterestItem } from '@/pages/profile/components'
import { Stack } from '@mui/material'
import { Reorder } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

export function MajorInterestSection() {
  const { majorInterest } = useMajorInterest()

  const [value, setValue] = useState<MajorInterest[]>([])
  const [prev, setPrev] = useState<MajorInterest[]>([])

  const reorderConstraintsRef = useRef<HTMLDivElement>(null)

  const onDragStart = () => {
    setPrev([...value])
  }

  const onDragEnd = () => {
    if (!isChanged) {
      return
    }
    console.log('CHANGE')
  }

  const isChanged = useMemo(() => {
    if (prev.length !== value.length) {
      return true
    }
    const length = prev.length
    for (let i = 0; i < length; i++) {
      if (prev[i].id !== value[i].id) {
        return true
      }
    }
    return false
  }, [prev, value])

  useEffect(() => {
    setValue(majorInterest)
  }, [majorInterest])

  return (
    <Stack p={1}>
      <ScrollContainer>
        <Stack
          direction="row"
          p={1}
          m={0}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          component={Reorder.Group}
          values={value}
          onReorder={setValue}
          ref={reorderConstraintsRef}
          axis="x"
        >
          {value.map((interest) => (
            <Stack
              key={interest.id}
              component={Reorder.Item}
              value={interest}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragConstraints={reorderConstraintsRef}
              dragElastic={0}
            >
              <MajorInterestItem interest={interest} />
            </Stack>
          ))}
        </Stack>
      </ScrollContainer>
    </Stack>
  )
}
