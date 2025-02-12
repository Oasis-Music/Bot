import { ReactNode, useRef, useEffect } from 'react'
import { Button } from '@/shared/ui/button'

interface BaseProps {
  open: boolean
  children: ReactNode
}

type ControlsProps =
  | {
      hideControls?: false
      controlActionText: string
      controlCloseText: string
      onSubmit(): void
      onClose(): void
    }
  | {
      hideControls: true
    }

type ModalProps = BaseProps & ControlsProps

export function Modal(props: ModalProps) {
  const { open, children, hideControls } = props

  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modalEl = modalRef.current
    if (modalEl) {
      modalRef.current.addEventListener('cancel', modalCancelEventHandler)
    }

    return () => {
      if (modalEl) {
        modalEl.removeEventListener('cancel', modalCancelEventHandler)
      }
    }
  }, [])

  useEffect(() => {
    const el = modalRef.current
    if (!el) return

    if (open) {
      el.showModal()
    } else {
      el.close()
    }
  }, [open])

  const modalCancelEventHandler = (e: Event) => e.preventDefault()

  const handleModalClose = () => {
    if (!modalRef.current) return
    modalRef.current.close()

    if (!hideControls) {
      props.onClose()
    }
  }

  return (
    <dialog
      ref={modalRef}
      className="animate-in fade-in zoom-in m-auto w-full rounded-lg bg-[#1c1c1e] p-2.5 backdrop:bg-black/30 backdrop:backdrop-blur-xs"
    >
      <div>{children}</div>
      {!hideControls && (
        <div className="flex justify-end pt-2.5">
          <Button color="secondary" onClick={props.onSubmit} className="text-gray-200">
            {props.controlActionText}
          </Button>
          <Button color="secondary" onClick={handleModalClose} className="text-red-600">
            {props.controlCloseText}
          </Button>
        </div>
      )}
    </dialog>
  )
}
