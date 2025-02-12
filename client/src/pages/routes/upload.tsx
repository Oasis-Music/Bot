import { createFileRoute } from '@tanstack/react-router'
import { UploadPage } from '../upload'

export const Route = createFileRoute('/upload')({
  component: UploadPage
})
