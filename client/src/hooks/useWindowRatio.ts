import { useState, useLayoutEffect } from 'react'

/*
  TODO: In mobile Chrome, it fires when autofilling fields
*/

function getWindowDimensions(): [number, number] {
  const { innerWidth, innerHeight } = window
  return [innerWidth, innerHeight]
}

export const useWindowRatio = (): [number, number] => {
  const [dimensions, setDimensions] = useState<[number, number]>(getWindowDimensions())

  const vw = (window.innerWidth * 0.01).toFixed(2)
  document.documentElement.style.setProperty('--vw', `${vw}px`)

  useLayoutEffect(() => {
    function updateSize() {
      const vw = (window.innerWidth * 0.01).toFixed(2)
      document.documentElement.style.setProperty('--vw', `${vw}px`)

      setDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return dimensions
}
