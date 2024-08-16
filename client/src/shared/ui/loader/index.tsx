import clsx from 'clsx'
import styles from './styles.module.scss'

interface LoaderProps {
  adaptive?: boolean
}

export function Loader({ adaptive = false }: LoaderProps) {
  return (
    <div
      className={clsx({
        [styles.loader]: true,
        [styles.adaptive]: adaptive
      })}
    />
  )
}
