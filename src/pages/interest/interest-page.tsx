import { alpha, Box, Stack } from '@mui/material'
import { useInterest, useInterestGraph, useMajorInterest } from '@/api/hooks'
import { ForceDirectedGraph } from '@/components/force-directed-graph'
import { CreateInterest, InterestIndicator } from './components'
import { useEffect, useState } from 'react'
import { Interest, InterestVertex } from '@/entities/interest'
import { OnEditHandler } from '@/components/editable/types'
import { useBoolean } from '@/hooks'

export function InterestPage() {
  const { interestList, deleteInterest, updateInterest } = useInterest()
  const { interestGraph, createEdge, deleteEdge } = useInterestGraph()
  const { majorInterest } = useMajorInterest()

  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)
  const [upperInterest, setUpperInterest] = useState<Interest | null>(null)

  const isMajor = useBoolean()

  const getUpperInterest = (interest: Interest) => {
    const vertex = interestGraph.edge.find((edge) => {
      return edge.target === interest.id
    })
    if (vertex === undefined) {
      return null
    }
    return interestList.find((interest) => interest.id === vertex.source) ?? null
  }

  const updateInterestHandler = (name: string, handler?: OnEditHandler) => {
    if (selectedInterest === null) {
      return
    }
    updateInterest({ id: selectedInterest.id, body: { name } }, handler)
  }

  const updateUpperInterestHandler = (newUpperId: string | null) => {
    if (selectedInterest === null) {
      return
    }

    if (upperInterest === null) {
      if (newUpperId !== null) {
        createEdge({ body: { parentInterestId: newUpperId, childInterestId: selectedInterest.id } })
      }
      return
    }

    const prevEdgeId =
      interestGraph.edge.find(
        (edge) => edge.target === selectedInterest.id && edge.source === upperInterest.id
      )?.id ?? null

    if (prevEdgeId === null) {
      return
    }
    deleteEdge({ id: prevEdgeId })
    if (newUpperId !== null) {
      createEdge({ body: { parentInterestId: newUpperId, childInterestId: selectedInterest.id } })
    }
  }

  const onSelectInterest = (vertex: InterestVertex | null) => {
    if (vertex === null) {
      setSelectedInterest(null)
      setUpperInterest(null)
      isMajor.onFalse()
      return
    }
    setSelectedInterest(vertex.interest)
    setUpperInterest(getUpperInterest(vertex.interest))
    isMajor.setValue(majorInterest?.some((interest) => interest.id === vertex.interest.id) ?? false)
  }

  const onDeleteInterest = () => {
    if (selectedInterest) {
      deleteInterest({ id: selectedInterest.id })
      setSelectedInterest(null)
    }
  }

  useEffect(() => {
    if (selectedInterest === null) {
      return
    }
    isMajor.setValue(
      majorInterest?.some((interest) => interest.name === selectedInterest?.name) ?? false
    )
  }, [isMajor, majorInterest, selectedInterest])

  return (
    <Stack
      width={1}
      height={1}
      direction="row"
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.5)}
    >
      <Stack width={250} height={1} p={1} spacing={1}>
        <InterestIndicator
          interest={selectedInterest}
          upperInterest={upperInterest}
          isMajor={isMajor.value}
          onDelete={onDeleteInterest}
          onChangeUpperInterest={updateUpperInterestHandler}
          onChangeInterestName={updateInterestHandler}
        />
        <CreateInterest />
      </Stack>
      <Box flex={1} height={1} p={1}>
        <ForceDirectedGraph data={interestGraph} onSelect={onSelectInterest} />
      </Box>
    </Stack>
  )
}
