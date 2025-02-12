import sunglassesEmoji from '@/shared/assets/rastr/tada.png'
import thinkingEmoji from '@/shared/assets/rastr/thinking.png'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/widgets/modal'
import { useTranslation } from 'react-i18next'

interface FeedbackProps {
  isOpen: boolean
  type: 'success' | 'fail'
  onSubmit(): void
  onRetry(): void
}

export function Feedback({ type, isOpen, onSubmit, onRetry }: FeedbackProps) {
  const { t } = useTranslation()

  const handleActionClick = () => {
    if (type === 'success') {
      onSubmit()
    } else {
      onRetry()
    }
  }

  return (
    <Modal open={isOpen} hideControls>
      <div className="pb-2.5">
        <img
          src={type === 'success' ? sunglassesEmoji : thinkingEmoji}
          className="m-auto mt-4 w-[37%]"
        />
        <h4 className="text-center text-2xl">
          {t(
            type === 'success'
              ? 'pages.upload.modals.feedback.successUpload'
              : 'pages.upload.modals.feedback.uploadFail'
          )}
        </h4>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleActionClick}>
            {t(
              type === 'success'
                ? 'pages.upload.modals.feedback.fine'
                : 'pages.upload.modals.feedback.close'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
