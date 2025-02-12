import { createFileRoute } from '@tanstack/react-router'
import { TermsPage } from '../terms'

export const Route = createFileRoute('/terms')({
  component: TermsPage
})
