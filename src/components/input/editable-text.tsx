import { Box, IconButton, Stack, Tooltip, Typography, TypographyProps } from '@mui/material'
import { Iconify } from '../iconify'
import { useBoolean } from '@/hooks'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

interface EditableTextProps extends TypographyProps {
  text: string
  onEdit?: (value: string) => void
  disableEdit?: boolean
  tooltip?: string
}

export function EditableText({ onEdit, text, disableEdit, tooltip, ...props }: EditableTextProps) {
  const isHovered = useBoolean()
  const isEditing = useBoolean()

  const [inputValue, setInputValue] = useState(text)

  const checkSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      isEditing.onFalse()
      onEdit?.(inputValue)
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="flex-end"
      position="relative"
      onMouseEnter={isHovered.onTrue}
      onMouseLeave={isHovered.onFalse}
      px="3px"
    >
      {isEditing.value ? (
        <Box
          component="input"
          value={inputValue}
          sx={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            bgcolor: 'transparent',
            fontSize: props.fontSize,
            fontWeight: props.fontWeight,
            color: (theme) => theme.palette.text.primary,
            fontFamily: (theme) => theme.typography.fontFamily,
            lineHeight: 'inherit',
            p: 0,
          }}
          onChange={inputHandler}
          onKeyDown={checkSubmit}
          autoFocus
          onBlur={isEditing.onFalse}
        />
      ) : (
        <Typography {...props}>{text}</Typography>
      )}
      {!disableEdit && !isEditing.value && isHovered.value && (
        <Tooltip title={tooltip}>
          <IconButton
            size="small"
            onClick={isEditing.onTrue}
            sx={{ position: 'absolute', right: 0, translate: 'calc(100%) 0' }}
          >
            <Iconify icon="lets-icons:edit" width={17} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  )
}
