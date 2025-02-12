import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '../settings'

export const Route = createFileRoute('/settings')({
  component: SettingsPage
})
