import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  height: 100vh;
  overflow-y: scroll;
`
const InitData = styled.code``

const Test: React.FC = () => {
  const [one, setOne] = useState<string>('???')
  const [two, setTwo] = useState<string>('???')
  const tg = Telegram.WebApp

  function round(val: number, d: number) {
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

  const safeData = new URLSearchParams(tg.initData).entries()

  return (
    <Container>
      <p>Theme: {tg.colorScheme}</p>
      <p>
        {one} <b>and</b> {two}
      </p>
      <p>Safe:</p>
      <InitData>{JSON.stringify(Object.fromEntries(safeData), null, 2)}</InitData>
      <p>Unsafe:</p>
      <code>{JSON.stringify(tg.initDataUnsafe, undefined, 2)}</code>
    </Container>
  )
}

export default Test
