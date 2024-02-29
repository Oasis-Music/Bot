import { SoundtrackStore } from '@/entities/soundtrack'

export const usePlayNextTrack = () => {
  return SoundtrackStore.playNext
}
