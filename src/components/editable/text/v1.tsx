import { EditableProps } from '@/components/editable/types'
import { Stack, Typography, TypographyProps } from '@mui/material'
import { InvisibleInput } from './invisible-input'
import { ChangeEvent } from 'react'

interface EditableTextProps extends EditableProps<string>, TypographyProps {
  value?: string
  ellipsis?: boolean
}

export function EditableText({ editable, value, onEdit, ...typographyProps }: EditableTextProps) {
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onEdit?.(e.target.value)
  }

  if (editable) {
    return (
      <Stack
        width={1}
        px={1}
        py={0.5}
        justifyContent="center"
        alignItems="center"
        bgcolor="divider"
        borderRadius={1}
        border={1}
        borderColor="divider"
      >
        <InvisibleInput
          value={value}
          onChange={inputHandler}
          typographyProps={typographyProps}
          sx={{ textAlign: 'center' }}
        />
      </Stack>
    )
  }
  return <Typography {...typographyProps}>{value}</Typography>
}
