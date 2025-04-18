import { useBoolean } from '@/hooks'
import { Box, IconButton } from '@mui/material'
import { motion } from 'motion/react'
import { useMemo } from 'react'

interface CheckboxProps {
  checked?: boolean
  onChanged?: (checked: boolean) => void
  defaultChecked?: boolean
  disableCancel?: boolean
}

export function Checkbox({
  checked: propsChecked,
  onChanged,
  defaultChecked,
  disableCancel,
}: CheckboxProps) {
  const innerChecked = useBoolean(defaultChecked)

  const checked = useMemo(() => {
    if (propsChecked === undefined) {
      return innerChecked.value
    }
    return propsChecked
  }, [propsChecked, innerChecked.value])

  const clickHandler = () => {
    if (propsChecked === undefined) {
      onChanged?.(!innerChecked.value)
      if (disableCancel && checked) {
        return
      }
      innerChecked.toggle()
      return
    }
    onChanged?.(!propsChecked)
  }

  return (
    <IconButton
      onClick={clickHandler}
      sx={{ p: '5px', borderRadius: 2 }}
      role="checkbox"
      aria-checked={checked}
    >
      <Box
        p="2px"
        width={20}
        height={20}
        borderRadius={1}
        border={2}
        borderColor={(theme) => (checked ? theme.palette.primary.main : theme.palette.border.dark)}
      >
        <Box
          component={motion.div}
          width={1}
          height={1}
          bgcolor="primary.main"
          borderRadius="2px"
          initial={{ scale: 0 }}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.65 }}
        />
      </Box>
    </IconButton>
  )
}
