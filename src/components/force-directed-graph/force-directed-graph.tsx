import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material'
import { Graph, Vertex } from './types'
import { useForceDirectedGraph } from '@/components/force-directed-graph/d3'
import { Iconify } from '@/components/iconify'

interface ForceDirectedGraphProps<V extends Vertex> {
  data: Graph<V>
  onSelect?: (interest: V | null) => void
}

export function ForceDirectedGraph<V extends Vertex>({
  data,
  onSelect,
}: ForceDirectedGraphProps<V>) {
  const {
    svgRef,
    onSvgClickHandler,
    zoomInHandler,
    zoomOutHandler,
    zoomResetHandler,
    centerGraphHandler,
  } = useForceDirectedGraph(data, onSelect)

  return (
    <Box position="relative" height={1} overflow="hidden">
      <Box
        component="svg"
        ref={svgRef}
        width={1}
        height={1}
        onClick={onSvgClickHandler}
        sx={{ userSelect: 'none' }}
      />
      <ControlPanel
        onZoomIn={zoomInHandler}
        onZoomOut={zoomOutHandler}
        onZoomReset={zoomResetHandler}
        onCenterGraph={centerGraphHandler}
      />
    </Box>
  )
}

interface ControlPanelProps {
  onZoomIn?: () => void
  onZoomOut?: () => void
  onZoomReset?: () => void
  onCenterGraph?: () => void
}

function ControlPanel({ onZoomIn, onZoomOut, onZoomReset, onCenterGraph }: ControlPanelProps) {
  return (
    <Stack
      position="absolute"
      bottom={10}
      left={10}
      direction="row"
      border={1}
      borderColor={(theme) => theme.palette.border.main}
      borderRadius={1}
      divider={<Divider orientation="vertical" flexItem />}
      bgcolor={(theme) => theme.palette.background.paper}
    >
      <Tooltip title="축소">
        <IconButton size="small" onClick={onZoomOut} sx={{ borderRadius: 0 }}>
          <Iconify icon="mdi:minus" />
        </IconButton>
      </Tooltip>

      <Tooltip title="확대">
        <IconButton size="small" onClick={onZoomIn} sx={{ borderRadius: 0 }}>
          <Iconify icon="mdi:plus" />
        </IconButton>
      </Tooltip>

      <Tooltip title="초기화">
        <IconButton size="small" onClick={onZoomReset} sx={{ borderRadius: 0 }}>
          <Iconify icon="carbon:zoom-reset" />
        </IconButton>
      </Tooltip>

      {/* <Tooltip title="중앙">
        <IconButton size="small" onClick={onCenterGraph} sx={{ borderRadius: 0 }}>
          <Iconify icon="mynaui:center-focus" />
        </IconButton>
      </Tooltip> */}
    </Stack>
  )
}
