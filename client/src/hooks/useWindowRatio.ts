import { useState, useLayoutEffect } from 'react'

/*
  TODO: In mobile Chrome, it fires when autofilling fields
*/

export const useWindowRatio = (): [number, number] => {
  const [dimensions, setDimensions] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight
  ])

  useLayoutEffect(() => {
    const handleResize = () => setDimensions([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return dimensions
}
