import { InvisibleInput } from '@/components/editable/text/invisible-input'
import { EditableProps } from '@/components/editable/types'
import { Iconify } from '@/components/iconify'
import { useBoolean } from '@/hooks'
import { useEditableStore } from '@/stores'
import {
  Box,
  Divider,
  IconButton,
  Stack,
  SxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

interface EditableTextProps extends EditableProps<string>, TypographyProps {
  value?: string
  inputSx?: SxProps
  inputMaxWidth?: number
}

export function EditableText({
  value,
  inputSx,
  inputMaxWidth,
  onEdit,
  ...typographyProps
}: EditableTextProps) {
  const { editableId, assign } = useEditableStore()

  const [inputValue, setInputValue] = useState<string>(value ?? '')
  const [assignedId, setAssignedId] = useState<string | null>(null)

  const isHovered = useBoolean()

  const isChanged = useMemo(() => value !== inputValue, [value, inputValue])

  const startEditHandler = () => {
    isHovered.onFalse()
    setAssignedId(assign())
  }

  const endEditHandler = () => {
    setAssignedId(null)
  }

  const submitHandler = () => {
    onEdit?.(inputValue)
    endEditHandler()
  }

  useEffect(() => {
    if (assignedId === null && isChanged) {
      setInputValue(value ?? '')
    }
  }, [value, assignedId, isChanged])

  useEffect(() => {
    if (editableId !== assignedId) {
      endEditHandler()
    }
  }, [editableId, assignedId])

  if (assignedId !== null) {
    return (
      <Stack width={1} maxWidth={inputMaxWidth} spacing={0}>
        <Stack
          width={1}
          p={0.5}
          bgcolor="divider"
          border={1}
          borderColor="divider"
          sx={{ borderRadius: 1, borderBottomRightRadius: 0 }}
        >
          <InvisibleInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            typographyProps={typographyProps}
            sx={{ textAlign: 'center', ...inputSx }}
            autoFocus
          />
        </Stack>
        <Stack
          direction="row"
          border={1}
          borderColor="divider"
          bgcolor="divider"
          alignSelf="flex-end"
          sx={{ borderRadius: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0 }}
        >
          <IconButton size="small" sx={{ borderRadius: 1 }} onClick={endEditHandler}>
            <Iconify icon="mdi:close" width={15} />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton size="small" sx={{ borderRadius: 1 }} onClick={submitHandler}>
            <Iconify icon="mdi:check" width={15} />
          </IconButton>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack position="relative" justifyContent="center" alignItems="center">
      <Box
        component={motion.div}
        position="absolute"
        px={1}
        py={0.5}
        width={1}
        height={1}
        bgcolor="divider"
        boxSizing="content-box"
        borderRadius={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered.value ? 1 : 0 }}
        sx={{ pointerEvents: 'none' }}
      />
      <Typography
        {...typographyProps}
        onMouseEnter={isHovered.onTrue}
        onMouseLeave={isHovered.onFalse}
        sx={{ cursor: 'pointer' }}
        onClick={startEditHandler}
      >
        {value}
      </Typography>
    </Stack>
  )
}
