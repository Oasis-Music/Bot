import { cva } from 'cva'
import { Icon } from './icon'

const expandIcon = cva('transition-all duration-300', {
  variants: {
    expanded: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

export function ExpandIcon({ size = 26, expanded }: { size?: number; expanded: boolean }) {
  return (
    <Icon
      name="common/angle-arrow"
      className={expandIcon({ expanded })}
      style={{
        fontSize: size
      }}
    />
  )
}
