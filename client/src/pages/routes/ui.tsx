import { createFileRoute } from '@tanstack/react-router'
import { UiPage } from '../ui'

export const Route = createFileRoute('/ui')({
  component: UiPage
})
