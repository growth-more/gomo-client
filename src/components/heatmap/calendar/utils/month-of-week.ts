import dayjs from 'dayjs'

export const getMonthOfWeek = (date: Date) => {
  const firstDayOfMonth = dayjs(date).startOf('month')
  const firstDayOfWeek = firstDayOfMonth.startOf('week')
  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'day')
  return Math.ceil((dayjs(date).date() + offset) / 7)
}
