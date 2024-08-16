import { ReactNode, useRef, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import styles from './modal.module.scss'

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
    <dialog ref={modalRef} className={styles.modal}>
      {children}
      {!hideControls && (
        <div className={styles.controls}>
          <Button color="secondary" onClick={props.onSubmit} className={styles.submitButton}>
            {props.controlActionText}
          </Button>
          <Button color="secondary" onClick={handleModalClose} className={styles.closeButton}>
            {props.controlCloseText}
          </Button>
        </div>
      )}
    </dialog>
  )
}
