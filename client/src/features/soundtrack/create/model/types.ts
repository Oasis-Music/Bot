export type FormValues = {
  title: string
  author: string
  attach: boolean
  coverImage?: File
  audioFile: File
}

export type FeedbackModal = {
  open: boolean
  type: 'success' | 'fail'
}
