import { useLayoutEffect } from 'react'

/*
  TODO: In mobile Chrome, it fires when autofilling fields
*/

export const useWindowCSSRatio = (): void => {
  const vw = (window.innerWidth * 0.01).toFixed(2)
  document.documentElement.style.setProperty('--vw', `${vw}px`)

  useLayoutEffect(() => {
    function updateSize() {
      const vw = (window.innerWidth * 0.01).toFixed(2)
      document.documentElement.style.setProperty('--vw', `${vw}px`)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
}
