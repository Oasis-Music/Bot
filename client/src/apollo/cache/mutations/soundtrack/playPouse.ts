import { ReactiveVar } from '@apollo/client'

export default (isPlayingVar: ReactiveVar<boolean>): (() => void) => {
  return (): void => {
    isPlayingVar(!isPlayingVar())
  }
}
