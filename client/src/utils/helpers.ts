export const timeFormater = (value: number): string => {
  const sec = String(Math.floor(value % 60))
  const min = String(Math.floor(value / 60))

  return min.padStart(1, '0') + ':' + sec.padStart(2, '0')
}
