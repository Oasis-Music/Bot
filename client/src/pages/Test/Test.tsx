import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div``

const Test: React.FC = () => {
  const [one, setOne] = useState<string>('???')
  const [two, setTwo] = useState<string>('???')
  const tg = (window as any).Telegram?.WebApp

  function round(val: any, d: any) {
    const k = Math.pow(10, d || 0)
    return Math.round(val * k) / k
  }

  function setViewportData() {
    setOne(window.innerWidth + ' x ' + round(tg.viewportHeight, 2))
    setTwo(
      window.innerWidth +
        ' x ' +
        round(tg.viewportStableHeight, 2) +
        ' | is_expanded: ' +
        (tg.isExpanded ? 'true' : 'false')
    )
  }

  useEffect(() => {
    setViewportData()
    tg.onEvent('viewportChanged', setViewportData)
    return () => {
      tg.offEvent('viewportChanged', setViewportData)
    }
  }, [])

  return (
    <Container>
      <p>Theme: {tg.colorScheme}</p>
      <p>{one}</p>
      <p>{two}</p>
    </Container>
  )
}

export default Test
