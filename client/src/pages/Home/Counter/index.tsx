import React from 'react'
import { Container, Line } from './Counter.styled'

interface CounterProps {
  text: string
  counter: number
}

export function Counter({ text, counter }: CounterProps) {
  return (
    <Container>
      <span>{text}</span>
      <Line />
      <span>
        {counter}/{import.meta.env.VITE_APP_MAX_TRACK_AVAILABLE}
      </span>
    </Container>
  )
}
