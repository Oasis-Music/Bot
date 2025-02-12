import { createFileRoute } from '@tanstack/react-router'

import { AuthPage } from '../auth'

export const Route = createFileRoute('/auth')({
  component: AuthPage
})
