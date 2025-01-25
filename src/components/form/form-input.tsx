import type { TextFieldProps as MuiTextFieldProps } from '@mui/material'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const DEFAULT_SIZE = 'small'
const DEFAULT_FULL_WIDTH = true

interface FieldProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

type TextFieldProps<T extends FieldValues> = MuiTextFieldProps &
  FieldProps<T> & {
    shrinkProps?: boolean
  }

export function FormInput<T extends FieldValues>({
  control,
  name,
  rules,
  shrinkProps,
  ...props
}: TextFieldProps<T>) {
  const { field, fieldState } = useController({ name, control, rules })

  return (
    <TextField
      {...field}
      inputRef={field.ref}
      size={props.size || DEFAULT_SIZE}
      fullWidth={props.fullWidth || DEFAULT_FULL_WIDTH}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      slotProps={{ inputLabel: { shrink: shrinkProps } }}
      {...props}
    >
      {props.children}
    </TextField>
  )
}
