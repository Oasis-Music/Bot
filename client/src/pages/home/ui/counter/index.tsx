import styles from './styles.module.scss'

interface CounterProps {
  text: string
  counter: number
}

export function Counter({ text, counter }: CounterProps) {
  return (
    <div className={styles.container}>
      <span>{text}</span>
      <div className={styles.line} />
      <span>
        {counter}/{import.meta.env.VITE_APP_MAX_TRACK_AVAILABLE}
      </span>
    </div>
  )
}
